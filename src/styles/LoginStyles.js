import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

const LoginStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.Background,
   // fontFamily: "Lato",
  },
  LoginContainer: {
    marginBottom: 20,
  },
  LoginText: {
    fontSize: 32,
    color: colors.text,
    textAlign: "center",
    marginTop: 24,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 67,
    height: 97,
    marginTop: 89,
    //backgroundColor:'black',
  },
  bottomBox: {
    alignItems: "center",
  },
  inputContainer: {
    padding: 10,
    width: "90%",
    borderRadius: 15,
    backgroundColor: colors.disabled,
    marginBottom: 30,
  },
  textInput: {
    marginLeft: 20,
    fontSize: 20,
    color: "#858181"
  },
  CheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  CheckboxLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 8,
  },
  ForgotLabel: {
    fontSize: 16,
    color: colors.text,
    marginTop: 12,
    alignSelf: "center",
  },
  errorMessage:{
    color: colors.cancel,
    marginBottom:10,
  },
};
export default LoginStyles;