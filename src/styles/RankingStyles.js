import { getColorScheme  } from "../components/Colors";
const colors = getColorScheme()

const getRankingStyles = (themeStyles) => ({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themeStyles.Background, // Użyj themeStyles zamiast colors
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  rank: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 32,
    color: themeStyles.text, // Dodaj kolor tekstu bazujący na motywie
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  userName: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: themeStyles.text, // Dodaj kolor tekstu bazujący na motywie
  },
  steps: {
    fontSize: 16,
    color: themeStyles.text, // Dodaj kolor tekstu bazujący na motywie
  },
  footstepsIcon: {
    marginLeft: 5,
    color: themeStyles.secondary, // Użyj koloru secondary z themeStyles
  },
});

export default getRankingStyles;