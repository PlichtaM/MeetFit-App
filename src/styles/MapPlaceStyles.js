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
    backgroundColor: "white",
    
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -20,
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
    textAlign: "center"
  },
  EventListList:{
    height:230,
    width:300,
    backgroundColor: colors.disabled
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
