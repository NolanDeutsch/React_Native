return (
    <View style={styles.MainContainer}>
      <Text style={styles.mainCounterText}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
    
      <TouchableOpacity onPress={this.onTimeIncrease}>
        <Text style={{fontSize: 50}}> + </Text>
      </TouchableOpacity>
      <Text style={styles.counterText}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
      <TouchableOpacity onPress={this.onTimeDecrease}>
        <Text style={{fontSize: 50}}> - </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={this.onButtonStart}
        activeOpacity={0.6}
        style={[styles.button, { marginTop: 50, backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
        disabled={this.state.startDisable} >

        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={this.onButtonPause}
        activeOpacity={0.6}
        style={[styles.button,  {backgroundColor: this.state.startDisable ? '#FF6F00' : '#B0BEC5' }]}>
        <Text style={styles.buttonText}>PAUSE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={this.onButtonClear}
        activeOpacity={0.6}
        style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
        disabled={this.state.startDisable} >

        <Text style={styles.buttonText}> CLEAR </Text>
      </TouchableOpacity>

    </View>
  );
}
}

const styles = StyleSheet.create({
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
button: {
  width: '80%',
  paddingTop:8,
  paddingBottom:8,
  borderRadius:7,
  marginTop: 10
},
buttonText:{
    color:'#fff',
    textAlign:'center',
    fontSize: 20
},
counterText:{
  padding: 25,
  fontSize: 28,
  color: '#000'
},
mainCounterText:{
  fontSize: 125,
  color: '#000'
}
});