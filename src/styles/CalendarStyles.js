import { colors } from "../components/Colors";

const CalendarStyles = {
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor: '#ffff'
  },
  dateContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dates:{
    fontSize:20,
    fontWeight:'bold',
  },
  arrow: {
    height:30,
    width:30,
  },
  arrowReverse: {
    transform: [{ rotate: '180deg' }],
    height: 40,
    width: 40,
  },
  eventButton: {
    backgroundColor: colors.disabled,
    width:360,
    padding:10,
    marginVertical: 5,
    borderRadius: 10,
  },
  eventText: {
    fontSize: 16,
    color: 'black',
  },
  evenEvent: { //co drugi kolor
    backgroundColor: colors.secondary, 
  },
  evenText: {//co drugi kolor tekstu
    fontSize: 16,
    color: 'white',
  },
 
}
export default CalendarStyles;
