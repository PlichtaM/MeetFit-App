import { StyleSheet } from 'react-native';
import { colors } from '../components/Colors';

const UserStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.Background,
    width:'100%',
    height: '100%',
  },
  top: {
    height: 200,
    backgroundColor: colors.primary,
  },
  UserIcon: {
    width: 200,
    height: 200,
    position: 'absolute', 
    top: 50,
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
    color: colors.text
  },
  stepIcon:{
    position: 'absolute',
    top:35,
    left: -50,
  },
  StepsNumber:{
    fontWeight: 'bold',
    fontSize: 16,    
    color: colors.text
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
    display:'flex',
    flexDirection:"row"
  },
  buttonText:{
    fontSize:20,
    color: colors.text
  },
  ButtonImage:{
    marginRight: 15,
    height:26,
    width:26,
  },
  ButtonIcon:{
    size:26,
    color:colors.secondary,
  },
});

export default UserStyles;