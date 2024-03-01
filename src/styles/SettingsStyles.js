import { colors } from "../components/Colors";
const SettingsStyles = {
  container: {
    marginTop:20,
    marginLeft: 20,
  },
  text: {
    marginVertical:10,
    fontSize:20,
  },   
  Checkboxes:{
    flexDirection: 'row',
    margin:10,
  },
  switchContainer:{
    flexDirection: 'row',},
  addEventButton:{
    marginTop: 15,
    backgroundColor: colors.secondary,
    width:'90%',
    height:35,
    borderRadius:10,
    justifyContent:'center',
  },
  addEventButtonText:{
    color:'white',
    textAlign:'center',
    fontSize: 20,
  },
};

export default SettingsStyles;
