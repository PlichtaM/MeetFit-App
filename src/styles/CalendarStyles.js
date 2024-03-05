import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

const CalendarStyles = {
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor: colors.Background
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
    color: colors.text
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
    color: colors.text
  },
  evenEvent: { //co drugi kolor
    backgroundColor: colors.secondary, 
  },
  evenText: {//co drugi kolor tekstu
    fontSize: 16,
    color: colors.text2
  },
 
}
export default CalendarStyles;
