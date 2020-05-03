import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';

var oboe = require('oboe');

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
  constructor(props){
    super(props);

    this.state = {
      months: [
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
    }
  }

  render(){
    return (
      <div>
        <button className="toggle-left" onClick={() => this.props.toggleMonth('Last')}><img src="/images/left-arrow.svg" alt="left arrow to view last month's data" /></button>
        <button className="toggle-right" onClick={() => this.props.toggleMonth('Next')}><img src="/images/right-arrow.svg" alt="right arrow to view next month's data" /></button>
        {this.state.months[this.props.currentDate.getMonth()]}
      </div>
    )
  }
}

class ViewToggles extends React.Component {

  render(){
    return (
      <div class="view-toggles right-align">
        <button className={"toggle-month " + (this.props.active === 'month' ? 'active-toggle' : 'inactive-toggle')} onClick={() => this.props.updateActiveState('month')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.637" height="22.255" viewBox="0 0 20.637 22.255">
            <g id="Group_17" data-name="Group 17" transform="translate(-94.171 -233.232)">
              <path id="Path_3" data-name="Path 3" d="M110.751,235.255a2.225,2.225,0,0,0-4.431,0h-3.662a2.225,2.225,0,0,0-4.431,0H94.171v20.232h20.637V235.255Zm-2.215-1.619a1.817,1.817,0,0,1,1.8,1.619h-3.6A1.817,1.817,0,0,1,108.536,233.637Zm-8.093,0a1.817,1.817,0,0,1,1.8,1.619h-3.6A1.817,1.817,0,0,1,100.443,233.637Zm13.96,21.446H94.576V239.3H114.4ZM94.576,238.9V235.66h3.661a2.222,2.222,0,0,0,2,2.013v-.415a1.814,1.814,0,0,1-1.6-1.6h7.689a2.222,2.222,0,0,0,2,2.013v-.415a1.814,1.814,0,0,1-1.6-1.6H114.4V238.9Z" />
              <path id="Path_4" data-name="Path 4" d="M100.955,264.776h14.616V252.232h-17.4v12.544h2.784Zm0-4.825h2.088v1.93h-2.088Zm0-2.412h2.088v1.93h-2.088Zm0-2.412h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93H110.7Zm2.088,4.342H110.7v-1.93h2.088Zm0,2.412H110.7v-1.93h2.088Zm-2.436,0h-2.088v-1.93h2.088Zm-2.436,0h-2.088v-1.93h2.088Zm-2.436,0h-2.088v-1.93h2.088Zm-2.088-4.342h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm-7.308,6.933v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm4.568,0h-2.132v-2.109h2.132Zm0-2.591h-2.132v-1.93h2.132Zm0-2.412h-2.132v-1.93h2.132Zm0-2.412h-2.132v-1.93h2.132Zm0-4.521v2.109h-2.132v-2.109Zm-2.48,0v2.109H110.7v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-4.568,0h2.132v2.109H98.474Zm0,2.591h2.132v1.93H98.474Zm0,2.412h2.132v1.93H98.474Zm0,2.412h2.132v1.93H98.474Zm0,4.521v-2.109h2.132v2.109Z" transform="translate(-2.381 -11.312)" fill="#fff"/>
            </g>
          </svg>
        </button>
        <button className={"toggle-day " + (this.props.active === 'day' ? 'active-toggle' : 'inactive-toggle')} onClick={() => this.props.updateActiveState('day')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21.204" height="22.867" viewBox="0 0 21.204 22.867">
            <g id="Group_16" data-name="Group 16" transform="translate(-87.694 -239.158)">
              <path id="Path_1" data-name="Path 1" d="M104.73,241.237a2.286,2.286,0,0,0-4.553,0H96.415a2.286,2.286,0,0,0-4.553,0H87.694v20.788h21.2V241.237Zm-2.276-1.663a1.867,1.867,0,0,1,1.85,1.663h-3.7A1.867,1.867,0,0,1,102.454,239.574Zm-8.315,0a1.867,1.867,0,0,1,1.85,1.663h-3.7A1.867,1.867,0,0,1,94.138,239.574Zm14.344,22.036H88.11V245.395h20.373ZM88.11,244.979v-3.326h3.762a2.283,2.283,0,0,0,2.059,2.068v-.426a1.864,1.864,0,0,1-1.644-1.642h7.9a2.283,2.283,0,0,0,2.059,2.068v-.426a1.864,1.864,0,0,1-1.644-1.642h7.88v3.326Z" transform="translate(0 0)" fill="#809bc9"/>
              <path id="Path_2" data-name="Path 2" d="M112.407,270.868c-1.508-.094-1.588-.148-1.588-1.171v-7a11.15,11.15,0,0,1-2.464.66v.336l.66.067c.592.054.686.081.686.768V269.7c0,1.01-.081,1.077-1.575,1.171v.377h4.281Z" transform="translate(-11.937 -13.752)" fill="#809bc9"/>
            </g>
          </svg>
        </button>
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
     currentDate: today,
     daysOfWeek: [
       'sunday',
       'monday',
       'tuesday',
       'wednesday',
       'thursday',
       'friday',
       'saturday'
     ]
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
    for(var i = 0; i < this.state.daysOfWeek.length; i++){
      returnValue.push(<div className="weekdays">{this.state.daysOfWeek[i]}</div>);
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
          bookingVisuals.push(<div className="booking"><span className="times">{formattedStartDate} - {formattedEndDate}</span> {data.room.name}</div>);
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
      <div className="calendar-background">
        <div className="calendar-grid grid grid-template--seven">
          {this.generateWeekDays()}
          {this.generateDateContainers()}
        </div>
      </div>
    )
  }
}

class DayView extends React.Component {
  render(){

    //Format the currently selected date for display
    var formattedDate = this.props.currentDate.getFullYear()+'-'+(this.props.currentDate.getMonth()+1)+'-'+this.props.currentDate.getDate();

    return(
    <div>
      <button className='date-toggle-left' style={{float: 'left'}} onClick={() => this.props.toggleDate('Past')}>Yesterday</button>
      <p>{formattedDate}</p>
      <button className='date-toggle-right' style={{float: 'right'}} onClick={() => this.props.toggleDate('Future')}>Tommorrow</button>
      <div style={{display: 'flex'}}>
          { this.props.failureMessage() }
          {this.props.showBookings.length > 0 ? this.props.showBookings.map(function(data, key){
          let formattedStartTime = new Date(data.start).getHours();
          let formattedEndTime = new Date(data.end).getHours();
          return (
            <div style={{width: '25%'}} key={key}>
            {this.props.convertHours(formattedStartTime) + " - " + this.props.convertHours(formattedEndTime)}
            <img src={data.room.imageUrl} style={{maxWidth: '100%'}} />
            </div>
          )
        }, this) : <p className='centered-p'>No bookings on this date.</p> }
      </div>
    </div>
  )}
}


class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      bookings: [],
      currentDate: new Date(),
      success: 'waiting',
      savedObject: {},
      active: 'month'
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
  toggleDate = (timePeriod) => {
    var newDate = this.state.currentDate;
    switch(timePeriod){
      case 'Past':
        newDate.setDate(this.state.currentDate.getDate() - 1);
        break;
      case 'Future':
        newDate.setDate(this.state.currentDate.getDate() + 1);
        break;
    }
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

  updateActiveState = (switchState) => {
    switch (switchState) {
      case 'month':
        this.setState({ active: 'month' });
        break;
      case 'day':
        this.setState({ active: 'day' });
        break;
    }
  }

  render(){

    //Compare the displayed date to the provided dates in the JSON - only return the dates that match
    var showBookings = this.state.bookings.filter(function(data){
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
          <div className="calendar-container">
              <div className="grid grid-template--two">
                <MonthToggles currentDate={this.state.currentDate} toggleMonth={this.toggleMonth} />
                <ViewToggles updateActiveState={this.updateActiveState} active={this.state.active} />
              </div>
          { this.state.active === 'month' ?
          <Calendar bookings={this.state.bookings} convertHours={this.convertHours} /> :
          <DayView active={this.state.active} convertHours={this.convertHours} failureMessage={this.failureMessage} showBookings={showBookings} toggleDate={this.toggleDate} currentDate={this.state.currentDate} />
          }
          </div>
        {/*<SubmitNewBooking updateArray={this.updateArray}  />*/}
      </div>
    );
  }
}

export default App;
