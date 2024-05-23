import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

const EventStyles = {
  screen: {
    backgroundColor: colors.Background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: colors.text,
  },
  createEventButton: {
    backgroundColor: colors.secondary,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  createEventButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  singUp: {
    backgroundColor: "#1b9b1b",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  SignOut: {
    backgroundColor: colors.cancel,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  chatButton: {
    backgroundColor: colors.primary,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  marginBottom: {
    marginBottom: 30,
  },
};

export default EventStyles;
