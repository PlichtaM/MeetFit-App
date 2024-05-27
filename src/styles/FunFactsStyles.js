import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()
const FunFactsStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.Background,
    paddingTop: 10,
  },
  factBox:{
    alignItems:'center',
    marginBottom: 20,
  },
  factContainer: {
    marginBottom: 20,
    width:350,
    borderRadius: 20,
    justifyContent:'center',
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: colors.disabled,
  },  
  titleContainer:{
    backgroundColor: colors.primary,
    width: '80%',
    height:40,
    borderRadius:10,
    alignItems:'center',
    justifyContent: 'center',    
    marginBottom:5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 10,
    marginRight:10,  
    borderRadius:20,
  },
  textContainer:{
    width:150,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.secondary,
    justifySelf: 'flex-end',    
    width: '80%',
    height:30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 3,
    width: '80%',
    margin: 20,
  },
};

export default FunFactsStyles;
