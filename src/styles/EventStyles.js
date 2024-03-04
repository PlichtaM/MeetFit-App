import { colors } from "../components/Colors";
const EventStyles = {
  screen:{
    height:'100%',
    width: '100%',
    backgroundColor: 'whtie',
  },
  container: {
    flex: 1,
    backgroundColor: 'whtie',
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.primary,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    padding: 10,
  },
  eventImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: colors.disabled,
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  createEventButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  createEventButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default EventStyles;
