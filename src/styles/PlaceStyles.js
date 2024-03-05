import { colors } from "../components/Colors";
const MapPlace = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    top: -100,
    flexDirection: "column",
    width: "80%",
    height: "80%",
  },
  topBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  bottomBox: {
    flex: 1,
    backgroundColor: colors.Background,    
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -25,
    right: -20,
    padding: 10,
  },
  closeButtonIcon: {
    height: 45,
    width: 45,
  },
  placeText: {
    marginTop: 15,
    marginBottom: 25,
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  PlacePicture: {
    width: 285,
    height: 150,
    marginBottom: 10,
    borderRadius:10,
  },
  AdressText: {
    color: "white",
    fontSize: 12,
  },
  AdressTextBold: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  EventListText:{    
    marginTop: 10,
    marginBottom:10,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: colors.text,
  },



  ListBox:{
    height:230,
    width:300,
    backgroundColor: colors.disabled,
    borderRadius:10,
  },
  EventListList:{
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    gap:5,
  },
  EventListItemText:{
    fontSize: 14,},
  line:{
    alignSelf:'center',
    height:3,
    width:'90%',
    backgroundColor:'#D9D9D9',
    margin:5,
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  noEvents:{    
    textAlign: 'center',
    marginTop:20,
  },


  addEventButton:{
    marginTop: 15,
    backgroundColor: colors.secondary,
    width:300,
    height:35,
    borderRadius:10,
    justifyContent:'center',
  },
  addEventButtonText:{
    color:'white',
    textAlign:'center',    
    fontWeight: "bold",
    fontSize: 16,
  },
};

export default MapPlace;
