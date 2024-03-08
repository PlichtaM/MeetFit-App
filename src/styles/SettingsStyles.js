import { getColorScheme } from "../components/Colors";

// Ta funkcja teraz przyjmuje obiekt colors jako argument i zwraca style.
const getSettingsStyles = (colors) => ({
  screen: {
    backgroundColor: colors.Background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: colors.text,
    shadowOffset: { height: 0, width: 0 },
    elevation: 5, // dla Androida
    backgroundColor: colors.buttonBackground,
  },
  text: {
    marginVertical: 10,
    fontSize: 20,
    color: colors.text,
  },
  themeButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    width: '100%', // Zapewnia pełną szerokość w kontenerze
    alignItems: 'center', // Aby tekst był wyśrodkowany
  },
  themeButtonText: {
    color: colors.text2,
    fontSize: 16,
  },
  addEventButton: {
    marginTop: 15,
    backgroundColor: colors.primary, // Zaktualizuj, aby użyć innego koloru
    width: '90%',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center', // Aby tekst był wyśrodkowany
  },
  addEventButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default getSettingsStyles;
