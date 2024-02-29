import { colors } from '../components/Colors'; 
const RankingStyles = {
      container: {
            flex: 1,
            padding: 16,
          },
          userItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 4,
            backgroundColor: 'transparent',
            borderRadius:10,
            width:360,
            padding:10,
          },
          rank: {
            marginRight: 10,
            fontWeight: 'bold',
            fontSize:32,
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
            fontSize:16,
          },
          steps: {
            fontSize:16,
          },
          footstepsIcon:{
            marginLeft:5,
          },
      }
export default RankingStyles