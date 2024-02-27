import { colors } from '../components/Colors';
const FunFactsStyles = {
  container: {
    flex: 1,
    backgroundColor:'white',
    paddingTop: 100,
  },
  factBox:{
    alignItems:'center',
    marginBottom: 20,
  },
  factContainer: {
    marginBottom: 20,
    width:350,
    height:180,
    borderColor: '#ccc',
    borderRadius: 20,
    alignItems:'center',
    backgroundColor: colors.disabled,
  },
  line: {
    backgroundColor: '#d9d9d9',
    height: 3,
    width: '100%',
    margin: 20,
  },
  titleContainer:{
    backgroundColor: colors.primary,
    width: '80%',
    height:40,
    width:350,
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
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.secondary,
    justifySelf: 'flex-end',    
    width:350,
    height:30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default FunFactsStyles;
