import { StyleSheet } from 'react-native';
import { colors } from '../components/Colors';

const UserStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.Background,
    width: '100%',
    height: '100%',
  },
  top: {
    height: 150,
    backgroundColor: colors.primary,
  },
  UserIcon: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 25,
    left: '50%',
    marginLeft: -100,
  },
  UserNameContainer: {
    position: 'absolute',
    top: 275,
    alignSelf: 'center',
    alignItems: 'center'
  },
  UserName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.text
  },
  stepIcon: {
    position: 'absolute',
    top: 35,
    left: -5,
  },
  StepsNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.text
  },
  MenuContainer: {
    position: 'absolute',
    top: 375,
    marginLeft: 50,
    height: 250,
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  UserButton: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: "row"
  },
  buttonText: {
    fontSize: 20,
    color: colors.text
  },
  ButtonImage: {
    marginRight: 15,
    height: 26,
    width: 26,
  },
  ButtonIcon: {
    size: 26,
    color: colors.secondary,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    top: '50%',
    marginTop: -150,
    width: '80%' 
  },
  InputButton: {
    backgroundColor: colors.secondary,
    borderRadius: 85,
    padding: 12,
    marginTop:21,
    alignItems: 'center',
    width: '90%',
    alignSelf:"center"
  },
  InputButtonText: {
    fontSize: 20,
    color: 'white',
  },
  textInput: {    
    fontSize: 30,
    fontWeight:"bold",
    textAlign:"center",
    padding: 10,
  },
});

export default UserStyles;
