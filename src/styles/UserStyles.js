import { StyleSheet } from 'react-native';
import { colors } from '../components/Colors';

const UserStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: 200,
    backgroundColor: colors.primary,
  },
  UserIcon: {
    width: 200,
    height: 200,
    position: 'absolute', 
    top: 100,
    left: '50%',
    marginLeft: -100,
  },
  UserNameContainer:{
    position: 'absolute',
    top: 300,
    alignSelf: 'center',
    alignItems: 'center'
  },
  UserName:{
    fontWeight: 'bold',
    fontSize: 24,
  },
  stepIcon:{
    position: 'absolute',
    top:35,
    left: -50,
  },
  StepsNumber:{
    fontWeight: 'bold',
    fontSize: 16,
  },
  MenuContainer:{
    position: 'absolute',
    top: 400,
    marginLeft:50,
    height:250,
    width:250,
    display:'flex',
    flexDirection:'column',
    justifyContent: "space-evenly",
    alignItems:"flex-start"
  },
  UserButton:{
    backgroundColor:'transparent',
    color: 'black',
    display:'flex',
    flexDirection:"row"
  },
  buttonText:{
    fontSize:20,
  },
  ButtonImage:{
    marginRight: 15,
    height:26,
    width:26,
  }
});

export default UserStyles;