import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class HittTrainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minutes_Counter: '15',
      seconds_Counter: '35',
      hitt_Seconds_Counter: '30',
      startDisable: false,
      backgroundColor: true,
      start: true
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  //Start button event
  onButtonStart = () => {
    let timer = setInterval(() => {
      //alert(this.state.seconds_Counter);

      //The Highintensity interval
      if ((Number(this.state.seconds_Counter) - Number(this.state.hitt_Seconds_Counter) <= 1) && !(this.state.start)){
        this.setState({backgroundColor: false});
      } else {
        //If the total time is greater than the hiit interval
        this.setState({backgroundColor: true});
        this.setState({start: false});
      }
      if (Number(this.state.seconds_Counter) == 1){
        this.setState({start: true});
      }

      var num = (Number(this.state.seconds_Counter) - 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 0) {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = '59';
      }

      //End Conditions
      if ((Number(this.state.seconds_Counter) == 0) && (Number(this.state.minutes_Counter) == 0)) {
        clearInterval(this.state.timer);
        this.setState({startDisable : false})
        num = '00';
        count = '00';
        //alert('finished');
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);

    this.setState({ timer });
    this.setState({startDisable : true})
  }
  //Pause button event 
  onButtonPause = () => {
    clearInterval(this.state.timer);
    this.setState({startDisable : false})
  }
  //Clear button event
  onButtonRestart = () => {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      minutes_Counter: '15',
      seconds_Counter: '00',
      backgroundColor: true,
      start: true
    });
  }
  //Increase time button event
  onTimeIncrease = () => {
    var currentMinute = Number(this.state.minutes_Counter);
    var num = (currentMinute + 1).toString();
    var currentSeconds = this.state.seconds_Counter.toString();
    this.setState({
      timer:null,
      minutes_Counter: num.length == 1 ? '0' + num : num,
      seconds_Counter: currentSeconds.length == 1 ? '0' + currentSeconds : currentSeconds,
    });
  }
  //Decrease time button event
  onTimeDecrease = () => {
    var currentNum = Number(this.state.minutes_Counter);
    var currentSeconds = this.state.seconds_Counter.toString();
    if(currentNum != 0){
      var num = (currentNum - 1).toString();
    this.setState({
      timer:null,
      minutes_Counter: num.length == 1 ? '0' + num : num,
      seconds_Counter: currentSeconds.length == 1 ? '0' + currentSeconds : currentSeconds,
    });
    } else{
    alert("Can't a negative time duration alloted.")
    }
  }
    //Increase HIIT time button event
  onHiitTimeIncrease = () => {
    var currentSecond = Number(this.state.hitt_Seconds_Counter);
    if(currentSecond != 60){
      var num = (currentSecond + 5).toString();
    this.setState({
      timer:null,
      hitt_Seconds_Counter: num.length == 1 ? '0' + num : num,
    });
  } else {
    alert("Can't a over a minute of high intensity.")
    }
  }
  //Decrease HIIT time button event
  onHiitTimeDecrease = () => {
    var currentNum = Number(this.state.hitt_Seconds_Counter);
    if(currentNum != 0){
      var num = (currentNum - 5).toString();
    this.setState({
      timer:null,
      hitt_Seconds_Counter: num.length == 1 ? '0' + num : num,
    });
    } else{
    alert("Can't a negative time duration alloted.")
    }
  }


  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.MainCounterView}>
          <Text style={[styles.mainCounterText, {color: this.state.backgroundColor ? 'black' : 'red' }]}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
        </View>

        <View style={styles.TimeChangeView}>
          <View style={styles.TotalTimeView, {paddingRight: 25}}>
          <Text style={styles.counterTextHeader}>Total Time</Text>
            <Text style={styles.counterText}>{this.state.minutes_Counter} : {this.state.seconds_Counter} min</Text>
            <View style={styles.TimeButtonView}>
              <TouchableOpacity onPress={this.onTimeIncrease}>
                <Text style={{fontSize: 40, paddingRight: 50}}> + </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onTimeDecrease}>
                <Text style={{fontSize: 40}}> - </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.HighIntensityView}>
          <Text style={styles.counterTextHeader}>High Interval</Text>
            <Text style={styles.counterText}>{this.state.hitt_Seconds_Counter} seconds</Text>
            <View style={styles.TimeButtonView}>
              <TouchableOpacity onPress={this.onHiitTimeIncrease}>
                <Text style={{fontSize: 40, paddingRight: 50}}> + </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onHiitTimeDecrease}>
                <Text style={{fontSize: 40}}> - </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.ButtonView}>
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
            onPress={this.onButtonRestart}
            activeOpacity={0.6}
            style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
            disabled={this.state.startDisable} >
            <Text style={styles.buttonText}> RESTART </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  MainCounterView: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainCounterText:{
    fontSize: 125,
    color: '#000'
  },
  TimeChangeView: {
    flex: 2,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  TotalTimeView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  HighIntensityView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  TimeButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  counterText:{
    padding: 10,
    fontSize: 28,
    color: '#000'
  },
  counterTextHeader: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold', 
    paddingBottom: 25
  },
  ButtonView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
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
});