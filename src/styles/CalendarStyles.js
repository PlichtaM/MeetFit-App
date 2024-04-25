const getCalendarStyles = (themeStyles) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: themeStyles.Background,
  },
  dateContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dates: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeStyles.text,
  },
  eventButton: {
    backgroundColor: themeStyles.disabled,
    width: 360,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  eventText: {
    fontSize: 16,
    color: themeStyles.text,
  },
  evenEvent: {
    backgroundColor: themeStyles.secondary,
  },
  evenEvent2: {
    backgroundColor: '#323232',
  },
  evenText: {
    fontSize: 16,
    color: themeStyles.text2,
  },
  sectionTitle:{
    marginBottom:10,
    marginTop: 30,
    fontSize:20,    
    color: themeStyles.text,
  },
});

export default getCalendarStyles;
