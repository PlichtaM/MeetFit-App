import { colors } from '../components/Colors';

const LoginStyles = {
    container: {
        flex: 1,
      },
      LoginContainer: {
        marginBottom: 20,
      },
      LoginText: {
        fontSize: 32,
        color: colors.text,
        textAlign: 'center',
        marginTop: 24,
      },
      logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: 67,
        height: 97,
        marginTop: 89,
      },
       
      CheckboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',    
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
        alignSelf: 'center',
      },
}
export default LoginStyles