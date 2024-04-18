import { getColorScheme } from "../components/Colors";
const colors = getColorScheme();

const Mapstyles = {
    container: {
        flex: 1,
      },
      map: {
        width: "100%",
        height: "100%",
      },
      searchBox: {
        position: "absolute",
        width: "90%",
        alignSelf: "center",
        marginTop: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      searchIcon: {
        marginRight: 8,
        backgroundColor: colors.primary,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
        top:-5,
        zIndex:1,
      },    
      searchBoxField: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: colors.disabled,
        width: "80%",
        height:35,
        fontSize: 18,
        marginBottom: 8,
        marginLeft: -20,
        //zIndex:-1,
        paddingLeft:30,
        borderRadius: 12,
        borderWidth:0.5,
        borderColor:colors.Background,
      },
      categoryBox: {
        position: "absolute",
        marginTop: 100,
        marginLeft: "5%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
        backgroundColor: colors.Background,
        borderRadius: 50,
        borderWidth:2,
        borderColor:colors.disabled,
      },
      buttonLabel: {
        fontSize: 18,
        color: "white",
      },
      mapLabel: {},
};
export default Mapstyles;