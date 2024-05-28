import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Pedometer } from "expo-sensors";
import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();
import UserStyles from "../styles/UserStyles";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getUser,
  changeAvatar,
  updateStepsCount,
  changeStepsGoal,
} from "../../services/api";
import LoadingScreen from "./Loading";
import * as Notifications from "expo-notifications";

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
}

async function sendNotification() {
    const notification = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cel kroków osiągnięty!",
        body: "Gratulacje! Osiągnąłeś swój dzienny cel kroków!",
        data: { data: "goes here" },
        sound: "default",
      },
      trigger: null,
    });
}

const saveSessionSteps = async (steps) => {
    await AsyncStorage.setItem('sessionSteps', steps.toString());
};

const loadSessionSteps = async () => {
    const steps = await AsyncStorage.getItem('sessionSteps');
    if (steps !== null) {
      return parseInt(steps, 10);
    }
    return 0;
};

function User({ navigation }) {
  const [user, setUser] = useState(null);
  const [initialStepCount, setInitialStepCount] = useState(0);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const isMounted = useRef(true);
  const [lastStepTime, setLastStepTime] = useState(0);
  const pedometerSubscription = useRef(null);

  const fetchData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId && isMounted.current) {
      const response = await getUser(userId);
      if (response && response.data) {
        setUser(response.data);
        const sessionStepsFromStorage = await loadSessionSteps();
        setSessionSteps(sessionStepsFromStorage);
      }
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    fetchData();
  }, []);

  const updateGoal = async (goal) => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      const parsedGoal = parseInt(goal, 10);
      const response = await changeStepsGoal(userId, parsedGoal);
      if (response.status === 200) {
        Alert.alert("Cel zaktualizowany:", "Twój cel kroków został zmieniony");
        setUser((prevUser) => ({ ...prevUser, stepsGoal: parsedGoal }));
      } else {
        Alert.alert("Błąd:", "Twój cel kroków nie zmienił się");
      }
    }
  };

  const handleOpenSetGoalModal = () => {
    setIsGoalModalVisible(true);
  };

  const handleCloseSetGoalModal = () => {
    setIsGoalModalVisible(false);
  };

  const handleGoalSubmit = () => {
    const parsedGoal = parseInt(newGoal, 10);
    if (parsedGoal > 0 && parsedGoal <= 50000) {
      updateGoal(parsedGoal);
      handleCloseSetGoalModal();
    } else if (parsedGoal > 50000) {
      Alert.alert("Cel kroków jest zbyt duży");
    } else {
      Alert.alert("Cel musi być większy od 0");
    }
  };

  const updateSessionSteps = (newSteps) => {
    setSessionSteps((prevSteps) => {
      const totalSteps = prevSteps + newSteps;
      saveSessionSteps(totalSteps); 
      return totalSteps;
    });
  };
  
  useEffect(() => {
    const setupPedometer = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (isAvailable) {
        pedometerSubscription.current = Pedometer.watchStepCount((result) => {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - lastStepTime;
  
          if (timeDiff >= 1000) {
            setInitialStepCount((prevCount) => prevCount + result.steps);
            updateSessionSteps(result.steps);
            setLastStepTime(currentTime);
          }
        });
      }
    };
  
    setupPedometer();
  
    return () => {
      if (pedometerSubscription.current) {
        pedometerSubscription.current.remove();
        pedometerSubscription.current = null;
      }
    };
  }, [lastStepTime]);

  useEffect(() => {
    const updateSteps = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const totalSteps = initialStepCount + sessionSteps;
        try {
          const updateResponse = await updateStepsCount(userId, totalSteps);
          if (updateResponse.status === 200) {
            setInitialStepCount(totalSteps);
            setSessionSteps(0);
            await AsyncStorage.setItem('sessionSteps', '0');
            if (user && totalSteps >= user.stepsGoal && user.stepsGoal > 0) {
              sendNotification();
            }
            fetchData();
          }
        } catch (error) {
          console.error("Error updating steps:", error);
        }
      }
    };
  
    if (sessionSteps > 0) {
      updateSteps();
    }
  
    const intervalId = setInterval(() => {
      if (sessionSteps > 0) {
        updateSteps();
      }
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [sessionSteps, initialStepCount, user?.stepsGoal]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "MeetFit",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <MaterialIcons
            name="settings"
            size={28}
            color="white"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerShadowVisible: false,
    });
  }, [navigation]);

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("LoginStackScreen");
  };

  const handleAvatarChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Dostęp do galeri jest wymagany aby zmienić avatar!!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const fileUri = pickerResult.assets[0].uri;
      const fileName = `user_avatar_${user.id}.jpg`;

      const data = new FormData();
      data.append("file", {
        uri: fileUri,
        name: fileName,
        type: "image/jpeg",
      });

      await changeAvatar(user.id, data);
      fetchData();
    }
  };

  if (!user) {
    return <LoadingScreen />;
  }

  const pictureUrl = "https://meetfitapp.pl" + (user.profilePictureUrl || "");
  const progress = user
    ? (initialStepCount + sessionSteps) / user.stepsGoal
    : 0;

  return (
    <View style={UserStyles.container}>
      <View style={UserStyles.top} />
      <TouchableOpacity
        onPress={handleAvatarChange}
        style={UserStyles.UserIcon}
      >
        <Image style={UserStyles.UserIcon} source={{ uri: pictureUrl }} />
      </TouchableOpacity>
      <View style={UserStyles.UserNameContainer}>
        <Text style={UserStyles.UserName}>{user.userName}</Text>
        <MaterialCommunityIcons
          name="foot-print"
          size={30}
          color={colors.primary}
          style={UserStyles.stepIcon}
        />
        <TouchableOpacity
          onPress={handleOpenSetGoalModal}
          style={{ minHeight: 40, justifyContent: "center" }}
        >
          <Progress.Bar
            progress={progress}
            width={150}
            height={20}
            color={colors.primary}
            unfilledColor={colors.disabled}
            borderWidth={0}
          />
        </TouchableOpacity>
        <Text style={UserStyles.StepsNumber}>
          {`${initialStepCount + sessionSteps}/${
            user?.stepsGoal || "Nie ustawiono celu"
          }`}
        </Text>
      </View>
      <View style={UserStyles.MenuContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Calendar")}
          style={UserStyles.UserButton}
        >
          <Entypo
            name="chat"
            size={26}
            color={colors.secondary}
            style={UserStyles.ButtonImage}
          />
          <Text style={UserStyles.buttonText}>Moje Wydarzenia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Calendar")}
          style={UserStyles.UserButton}
        >
          <MaterialCommunityIcons
            name="calendar-multiselect"
            size={26}
            color={colors.secondary}
            style={UserStyles.ButtonImage}
          />
          <Text style={UserStyles.buttonText}>Kalendarz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Ranking")}
          style={UserStyles.UserButton}
        >
          <MaterialCommunityIcons
            name="trophy"
            size={26}
            color={colors.secondary}
            style={UserStyles.ButtonImage}
          />
          <Text style={UserStyles.buttonText}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("FunFacts")}
          style={UserStyles.UserButton}
        >
          <MaterialCommunityIcons
            name="head-question"
            size={26}
            color={colors.secondary}
            style={UserStyles.ButtonImage}
          />
          <Text style={UserStyles.buttonText}>Ciekawostki</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={UserStyles.UserButton}>
          <MaterialCommunityIcons
            name="logout"
            size={26}
            color={colors.secondary}
            style={UserStyles.ButtonImage}
          />
          <Text style={UserStyles.buttonText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isGoalModalVisible}
        onRequestClose={handleCloseSetGoalModal}
        style={{ alignItems: "center" }}
      >
        <View style={UserStyles.modalView}>
          <TextInput
            style={UserStyles.textInput}
            onChangeText={setNewGoal}
            value={newGoal}
            placeholder="Cel kroków"
            keyboardType="numeric"
          />
          <Pressable
            title="Zmień"
            onPress={handleGoalSubmit}
            style={UserStyles.InputButton}
          >
            <Text style={UserStyles.InputButtonText}>Zmień</Text>
          </Pressable>
          <Pressable
            title="Anuluj"
            onPress={handleCloseSetGoalModal}
            style={UserStyles.InputButton}
          >
            <Text style={UserStyles.InputButtonText}>Anuluj</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

export default User;
