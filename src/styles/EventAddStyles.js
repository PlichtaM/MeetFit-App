import { colors } from "../components/Colors";
const EventAddStyles = {
  background: {
    backgroundColor: 'white',
    width:'100%',
    height:'100%',
  },
  container: {
    marginTop:60,
    marginLeft: 20,
  },
  text: {
    marginVertical:10,
    fontSize:20,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: colors.disabled,
    width: '90%',
    borderRadius:15,
  },
  textInput:{
    marginLeft:20,
    fontSize:20,
    color:'#858181'
  },
  sliderContainer:{    
    flexDirection: 'row',
  },
  odDo:{    
    fontSize:20,
    color: colors.primary,
  },
  slider:{
    width:'80%',
    alignSelf:'center',
    color:colors.primary,    
    height: 5,
  },
  thumb: {
    width: 50,
    height: 80,
    backgroundColor: colors.primary,
  },
  track:{
    height: 80,
    borderBottomRightRadius: 20,
    backgroundColor: colors.primary,
  },
   
  Checkboxes:{
    flexDirection: 'row',
    margin:10,
  },
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
  calendar:{    
    borderRadius:15,
    width: 350,
  },
  
};

export default EventAddStyles;
