import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';

var oboe = require('oboe');

var daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class SubmitNewBooking extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      date: '',
      startTime: '',
      endTime: '',
      room: ''
    }
  }

  //This function stores the form data in state whenever it changes
  handleChange = (event) => {
    console.log(event.target.name);
    switch(event.target.name) {
      case 'date':
        this.setState({date: event.target.value});
        break;
      case 'start-time':
        this.setState({startTime: event.target.value});
        break;
      case 'end-time':
        this.setState({endTime: event.target.value});
        break;
      case 'room-name':
        this.setState({room: event.target.value});
        break;
    }
  }

  //This function handles the data once it has been submitted and gives the user feedback
  handleSubmit = (event) => {
    event.preventDefault();

    //Rudimentary form checking - this makes sure the values have been filled out
    if(this.state.date !== '' && this.state.startTime !== '' && this.state.endTime !== '' && this.state.room !== ''){

      //Generate Values to add to Array - this is currently a temporary data storage that doesn't last between sessions
      //it would need to be sent to a server to live permanently with the whole data set
      var randomID = Math.floor(Math.random() * Math.floor(500));
      var randomRoomID = Math.floor(Math.random() * Math.floor(500));
      var startTime = new Date(this.state.date + 'T' + this.state.startTime + ':00');
      var formattedStartTime = startTime.toISOString();
      var endTime = new Date(this.state.date + 'T' + this.state.endTime + ':00');
      var formattedEndTime = endTime.toISOString();

      //Image URLs - this currently assumes only these two rooms are available in the data set - wow, I've explained this can be expanded mothufucker
      var roomAURL = "https://staging.cove.is/parse/files/hRKEvW2lN74k5nCg6p2XtmiWRNHycE2pHpXpELMX/f96efd3f11aadb34135bb1f0aecf9667_Quincy%20Room.jpg";
      var roomBURL = "https://staging.cove.is/parse/files/hRKEvW2lN74k5nCg6p2XtmiWRNHycE2pHpXpELMX/d0d19da4aa88734291279f5fe7a836e7_Wakefield%20Room.jpg";

      //This creates the object and saves it to the object array that lives in the parent
      var objectToSave = {"id": randomID, "start" : formattedStartTime, "end": formattedEndTime, "room": { "id": randomRoomID, "name": this.state.room, "imageUrl": this.state.room === "Room A" ? roomAURL : roomBURL }};
      this.props.updateArray(objectToSave);

      //This lets the user know their data has been submitted
      alert("Submitted");
      return;
    }

    //If the user didn't fill out at least one of the fields, this warning should appear
    alert("Failed to save. Please fill out all input fields.");
    return;
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <p>Book A Room</p>
        <label>Date
          <input type="date" name="date" onChange={this.handleChange}></input>
        </label>
        <label>Start Time
          <input type="time" name="start-time" onChange={this.handleChange}></input>
        </label>
        <label>End Time
          <input type="time" name="end-time" onChange={this.handleChange}></input>
        </label>
        <label>Select Room
          <select id="room-name" name="room-name" onChange={this.handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="Room A">Quincy Room</option>
            <option value="Room B">Wakefield Room</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class RoomTitle extends React.Component {
  render(){
    return (
      <h2>Studio 301</h2>
    )
  }
}
class AppTitle extends React.Component {
  render(){
    return (
      <h1>Room Bookings</h1>
    )
  }
}

class MonthToggles extends React.Component {

  render(){
    return (
      <div>
        {months[this.props.currentDate.getMonth()]}
        <button onClick={() => this.props.toggleMonth('Last')}>Last</button>
        <button onClick={() => this.props.toggleMonth('Next')}>Next</button>
      </div>
    )
  }
}

class Calendar extends React.Component {

 constructor(props) {
   super(props);

   var today = new Date();

   this.state = {
     today: today,
     currentDate: today
   }
 }

 toggleMonth = (direction) => {
   switch(direction) {
     case 'Last':
      this.setState(prev=>({currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() - 1, 1)}));
     break;
     case 'Next':
      this.setState(prev=>({currentDate: new Date(prev.currentDate.getFullYear(), prev.currentDate.getMonth() + 1, 1)}));
     break;
   }
 }

  generateWeekDays = () => {

    var returnValue = [];
    for(var i = 0; i < daysOfWeek.length; i++){
      returnValue.push(<div className="weekdays">{daysOfWeek[i]}</div>);
    }
    return (returnValue);
  }

  generateStartDate(currentDate){
    var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    var startDay = firstDayOfMonth.getDay();

    return startDay;
  }

  generateEndDate(currentDate){
    var lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    var endDate = lastDayOfMonth.getDate();

    return endDate;
  }

  generateDateContainers = () => {
    var returnValue = [];
    var dayValue = null;
    var monthLength = this.generateEndDate(this.state.currentDate);

    //Initialize collected json data
    var displayBookings = this.props.bookings;


    /*The maximum number of rows a month can have is 6*/
    for(var m = 0; m < 6; m++){
      for(var j = 0; j < 7; j++){

        /*Start numbering boxes based on starting day of week, increment until we reach the last day of the month*/
        if(m === 0 && j === this.generateStartDate(this.state.currentDate)){
          dayValue = 1;
        } else if (dayValue > 0 && dayValue < monthLength) {
          dayValue += 1;
        } else if (dayValue === monthLength) {
          dayValue = null;
        }

        var dayBookings = displayBookings.filter(function(data){
          var date = new Date(data.start);
          var dateComparison = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth());
                      console.log(dateComparison);
          date.setHours(0,0,0,0);
          dateComparison.setHours(0,0,0,0);
          dateComparison.setDate(dayValue);
          return date.getTime() == dateComparison.getTime()
        }, this);

        var bookingVisuals = [];
        dayBookings.forEach(function(data){
          var startDate = new Date(data.start);
          var endDate = new Date(data.end);
          var formattedStartDate = this.props.convertHours(startDate.getHours());
          var formattedEndDate = this.props.convertHours(endDate.getHours());
          bookingVisuals.push(<div className="booking">{formattedStartDate} - {formattedEndDate} {data.room.name}</div>);
        }, this);

        returnValue.push(<div className="grid-item">{dayValue}{bookingVisuals}</div>);
      }

      /*Prevents the loop from creating an empty week if dayValue has been reset to null*/
      if (m > 0 && dayValue === null) {
        break;
      }
    }
    return (returnValue);
  }

  render(){
    return (
      <div className="calendar-container">
        <MonthToggles currentDate={this.state.currentDate} toggleMonth={this.toggleMonth} />
        <div className="calendar-background">
        <div className="calendar-grid grid grid-template--seven">
          {this.generateWeekDays()}
          {this.generateDateContainers()}
        </div>
        </div>
      </div>
    )
  }
}


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      bookings: [],
      currentDate: new Date(),
      success: 'waiting',
      savedObject: {}
    }
  }

  //After the component mounts, oboe.js is used to call of the data from the endpoint
  //it uses progressive streaming to allow for partial data retention if the JSON fails to fully load
  componentDidMount(){
    oboe('https://cove-coding-challenge-api.herokuapp.com/reservations')
    .node('!.*', ( booking ) => {

      let newBookings = this.state.bookings;

      // This callback will be called everytime a new object is found
      this.setState(prev=>({ bookings: newBookings.concat(booking), success: 'processing' }));

   })
     .done((things) => {
        //Successfully retrieved json
        this.setState({ bookings: things, success: 'success' });
     })
     .fail(() => {
        // JSON Retrieval Failed
        this.setState({ success: 'failure' });
     });
  }

  //This converts hours to standard 1-12 values from 1-24 values and adds AM/PM delineators
  convertHours = (providedTime) => {
    if(providedTime > 12) {
      return providedTime - 12 + 'pm';
    } else if(providedTime === 12) {
      return providedTime + 'pm';
    }
    return providedTime + 'am';
  }

  //Set state to yesterday
  toggleDatePast = () => {
    var newDate = this.state.currentDate;
    newDate.setDate(this.state.currentDate.getDate() - 1);
    this.setState(
      prev => ({currentDate: newDate})
    );
  }

  //Set state to today
  toggleDateFuture = () => {
    var newDate = this.state.currentDate;
    newDate.setDate(this.state.currentDate.getDate() + 1);
    this.setState(
      prev => ({currentDate: newDate})
    );
  }

  //This converts hours to standard 1-12 values from 1-24 values and adds AM/PM delineators
  convertHours = (providedTime) => {
    if(providedTime > 12) {
      return providedTime - 12 + 'pm';
    } else if(providedTime === 12) {
      return providedTime + 'pm';
    }
    return providedTime + 'am';
  }

  //If the JSON fails to fully load, the user receives this error message
  failureMessage = () => {
    if(this.state.success === 'failure') {
      return <p className='centered-p'>We are having trouble loading everything right now. For a complete list of bookings, try again later.</p>
    }
  }

  //This is used by the submitNewBooking form to update the state when a new booking request is submitted
  updateArray = (object) => {
    this.setState(prev=>({ bookings: prev.bookings.concat(object) }), () => console.log(this.state.bookings));
  }

  render(){

    //Format the currently selected date for display
    var formattedDate = this.state.currentDate.getFullYear()+'-'+(this.state.currentDate.getMonth()+1)+'-'+this.state.currentDate.getDate();

    //Initialize collected json data
    var displayBookings = this.state.bookings;

    //Compare the displayed date to the provided dates in the JSON - only return the dates that match
    var showBookings = displayBookings.filter(function(data){
      var date = new Date(data.start);
      var dateComparison = this.state.currentDate;
      date.setHours(0,0,0,0);
      dateComparison.setHours(0,0,0,0);
      return date.getTime() == dateComparison.getTime()
    }, this);

    return (
      <div className="App">
          <div className="header-block grid grid-template--two">
            <div className="title">
              <RoomTitle />
              <AppTitle />
            </div>
            <div className="menu">
              <button>Book a Room</button>
            </div>
          </div>
          <Calendar bookings={displayBookings} convertHours={this.convertHours} />
          <button className='date-toggle-left' style={{float: 'left'}} onClick={this.toggleDatePast}>Yesterday</button>
          <p>{formattedDate}</p>
          <button className='date-toggle-right' style={{float: 'right'}} onClick={this.toggleDateFuture}>Tommorrow</button>
        <div style={{display: 'flex'}}>
            { this.failureMessage() }
            {showBookings.length > 0 ? showBookings.map(function(data, key){
            let formattedStartTime = new Date(data.start).getHours();
            let formattedEndTime = new Date(data.end).getHours();
            return (
              <div style={{width: '25%'}} key={key}>
              {this.convertHours(formattedStartTime) + " - " + this.convertHours(formattedEndTime)}
              <img src={data.room.imageUrl} style={{maxWidth: '100%'}} />
              </div>
            )
          }, this) : <p className='centered-p'>No bookings on this date.</p> }
        </div>
        {/*<SubmitNewBooking updateArray={this.updateArray}  />*/}
      </div>
    );
  }
}

export default App;
