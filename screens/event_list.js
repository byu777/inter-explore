// ---------------------------LIST OF EVENTS page ------------------------------
// havent made yet!!!!!!!!!!!!!!!!!
const EventBoard = ({ navigation }) => {
    return (
      <View style={chatroom_styles.container}>
        <Text style={chatroom_styles.baseText}>
          I am bold
          <Text style={chatroom_styles.innerText}> and red</Text>
        </Text>
  
        <Button
          title="Create Event"
          onPress={() => navigation.navigate("EventBoard", { name: "Jane" })}
        />
      </View>
    );
  };