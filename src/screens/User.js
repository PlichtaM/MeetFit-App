import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
  Alert,
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
  console.log("Preparing to send a notification..."); // Debug log
  try {
    const notification = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Cel kroków osiągnięty!",
        body: "Gratulacje! Osiągnąłeś swój dzienny cel kroków!",
        data: { data: "goes here" },
        sound: "default", // Użyj domyślnego dźwięku powiadomienia
      },
      trigger: null, // Wyślij natychmiast
    });
    console.log("Notification scheduled:", notification); // Debug log
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
}

function User({ navigation }) {
  const [user, setUser] = useState(null);
  const [initialStepCount, setInitialStepCount] = useState(0);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    // Rejestruj dla powiadomień
    registerForPushNotificationsAsync();

    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId && isMounted.current) {
        const response = await getUser(userId);
        if (response && response.data) {
          setUser(response.data);
          setInitialStepCount(response.data.stepsCount || 0);
        }
      }
    };
    fetchData();
  }, []);

  const updateGoal = async (goal) => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      const parsedGoal = parseInt(goal, 10);
      console.log("Updating step goal to:", parsedGoal); // Debug log
      const response = await changeStepsGoal(userId, parsedGoal);
      if (response.status === 200) {
        Alert.alert(
          "Goal Updated",
          "Your step goal has been successfully updated."
        );
        setUser((prevUser) => ({ ...prevUser, stepsGoal: parsedGoal }));
      } else {
        Alert.alert("Update Failed", "Failed to update step goal.");
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

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      setSessionSteps(result.steps);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const updateSteps = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (userId && sessionSteps > 0) {
        const totalSteps = initialStepCount + sessionSteps;
        const updateResponse = await updateStepsCount(userId, totalSteps);
        console.log("Update response:", updateResponse.status); // Debug log
        if (updateResponse.status === 200) {
          setInitialStepCount(totalSteps);
          setSessionSteps(0);
          console.log("Total steps:", totalSteps, "Goal:", user?.stepsGoal); // Debug log
          if (user && totalSteps >= user.stepsGoal && user.stepsGoal > 0) {
            console.log("Sending notification..."); // Debug log
            sendNotification();
          }
        }
      }
    };

    if (sessionSteps > 0) {
      const timeoutId = setTimeout(updateSteps, 5000);
      return () => clearTimeout(timeoutId);
    }
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
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Access to the gallery is required to change the avatar!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const fileUri = pickerResult.assets[0].uri.replace("file://", "");
      const fileName = `user_avatar_${user.id}.jpg`;

      const fileResponse = await fetch(fileUri);
      const fileBlob = await fileResponse.blob();

      const data = new FormData();
      data.append("file", fileBlob, fileName);

      await changeAvatar(user.id, data);
      refreshUserData();
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
          } steps`}
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
        <TouchableOpacity
          onPress={() => navigation.navigate("OtherScreens")}
          style={UserStyles.UserButton}
        >
          <MaterialCommunityIcons
            name="account-alert"
            size={26}
            color={colors.secondary}
            style={UserStyles.ButtonImage}
          />
          <Text style={UserStyles.buttonText}>OtherScreens</Text>
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
      >
        <View style={UserStyles.modalView}>
          <TextInput
            style={UserStyles.input}
            onChangeText={setNewGoal}
            value={newGoal}
            placeholder="Wprowadź nowy cel kroków"
            keyboardType="numeric"
          />
          <Button title="Zmień" onPress={handleGoalSubmit} />
          <Button title="Anuluj" onPress={handleCloseSetGoalModal} />
        </View>
      </Modal>
    </View>
  );
}

export default User;
