import React, { Fragment } from 'react';
import './App.scss';
import SubmitNewBooking from './SubmitNewBooking';
import DayView from './DayView';

var oboe = require('oboe');

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
      <Fragment>
        <button className="toggle-left" onClick={() => this.props.toggleMonth('Last')}><img src="/images/left-arrow.svg" alt="left arrow to view last month's data" /></button>
        <button className="toggle-right" onClick={() => this.props.toggleMonth('Next')}><img src="/images/right-arrow.svg" alt="right arrow to view next month's data" /></button>
        <span className="month-name">{this.state.months[this.props.currentDate.getMonth()]}</span>
      </Fragment>
    )
  }
}

class DayToggles extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
     //Format the currently selected date for display
     var formattedDate = this.props.currentDate.getFullYear()+'-'+(this.props.currentDate.getMonth()+1)+'-'+this.props.currentDate.getDate();
    return (
      <Fragment>
        <button className='toggle-left' onClick={() => this.props.toggleDate('Past')}><img src="/images/left-arrow.svg" alt="left arrow to view yesterday's data" /></button>
        <button className='toggle-right' onClick={() => this.props.toggleDate('Future')}><img src="/images/right-arrow.svg" alt="right arrow to view tommorow's data" /></button>
        {formattedDate}
      </Fragment>
    )
  }
}

class ViewToggles extends React.Component {

  render(){
    return (
      <div className="view-toggles right-align">
        <button className={"toggle-month " + (this.props.active === 'month' ? 'active-toggle' : 'inactive-toggle')} onClick={() => this.props.updateActiveState('month')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.637" height="22.255" viewBox="0 0 20.637 22.255">
            <g id="Group_17" data-name="Group 17" transform="translate(-94.171 -233.232)">
              <path id="Path_3" data-name="Path 3" d="M110.751,235.255a2.225,2.225,0,0,0-4.431,0h-3.662a2.225,2.225,0,0,0-4.431,0H94.171v20.232h20.637V235.255Zm-2.215-1.619a1.817,1.817,0,0,1,1.8,1.619h-3.6A1.817,1.817,0,0,1,108.536,233.637Zm-8.093,0a1.817,1.817,0,0,1,1.8,1.619h-3.6A1.817,1.817,0,0,1,100.443,233.637Zm13.96,21.446H94.576V239.3H114.4ZM94.576,238.9V235.66h3.661a2.222,2.222,0,0,0,2,2.013v-.415a1.814,1.814,0,0,1-1.6-1.6h7.689a2.222,2.222,0,0,0,2,2.013v-.415a1.814,1.814,0,0,1-1.6-1.6H114.4V238.9Z" fill="#809bc9" />
              <path id="Path_4" data-name="Path 4" d="M100.955,264.776h14.616V252.232h-17.4v12.544h2.784Zm0-4.825h2.088v1.93h-2.088Zm0-2.412h2.088v1.93h-2.088Zm0-2.412h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93H110.7Zm2.088,4.342H110.7v-1.93h2.088Zm0,2.412H110.7v-1.93h2.088Zm-2.436,0h-2.088v-1.93h2.088Zm-2.436,0h-2.088v-1.93h2.088Zm-2.436,0h-2.088v-1.93h2.088Zm-2.088-4.342h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm2.436,0h2.088v1.93h-2.088Zm-7.308,6.933v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm2.436,0v-2.109h2.088v2.109Zm4.568,0h-2.132v-2.109h2.132Zm0-2.591h-2.132v-1.93h2.132Zm0-2.412h-2.132v-1.93h2.132Zm0-2.412h-2.132v-1.93h2.132Zm0-4.521v2.109h-2.132v-2.109Zm-2.48,0v2.109H110.7v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-2.436,0v2.109h-2.088v-2.109Zm-4.568,0h2.132v2.109H98.474Zm0,2.591h2.132v1.93H98.474Zm0,2.412h2.132v1.93H98.474Zm0,2.412h2.132v1.93H98.474Zm0,4.521v-2.109h2.132v2.109Z" transform="translate(-2.381 -11.312)" fill="#809bc9"/>
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
    let dayValue = null;
    var monthLength = this.generateEndDate(this.props.currentDate);

    //Initialize collected json data
    var displayBookings = this.props.bookings;

    /*The maximum number of rows a month can have is 6*/
    for(let m = 0; m < 6; m++){
      for(let j = 0; j < 7; j++){

        //initialize values in loop to ensure unique variable is referenced in each iteration
        let bookingVisuals = [];

        /*Start numbering boxes based on starting day of week, increment until we reach the last day of the month*/
        if(m === 0 && j === this.generateStartDate(this.props.currentDate)){
          dayValue = 1;
        } else if (dayValue > 0 && dayValue < monthLength) {
          dayValue += 1;
        } else if (dayValue === monthLength) {
          dayValue = null;
        }

        //reference only local scope in function calls to prevent scope errors
        let currentDayValue = dayValue;

        var dayBookings = displayBookings.filter(function(data){
          var date = new Date(data.start);
          var dateComparison = new Date(this.props.currentDate.getFullYear(), this.props.currentDate.getMonth());
          date.setHours(0,0,0,0);
          dateComparison.setHours(0,0,0,0);
          dateComparison.setDate(currentDayValue);
          return date.getTime() === dateComparison.getTime()
        }, this);

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

class BookRoom extends React.Component {

  render(){
    return(
      <button onClick={() => this.props.updateActiveState('booking')}>Book a Room</button>
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
      savedObject: {},
      active: 'month',
      rooms: []
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

  //If the JSON fails to fully load, the user receives this error message
  failureMessage = () => {
    if(this.state.success === 'failure') {
      return <p className='centered-p'>We are having trouble loading everything right now. For a complete list of bookings, try again later.</p>
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
      default:
        //do nothing
    }
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
      default:
        //do nothing
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
      case 'booking':
        this.setState({ active: 'booking' });
        break;
      default:
        //do nothing
    }
  }

  render(){

    //Compare the displayed date to the provided dates in the JSON - only return the dates that match
    var showBookings = this.state.bookings.filter(function(data){
      var date = new Date(data.start);
      var dateComparison = this.state.currentDate;
      date.setHours(0,0,0,0);
      dateComparison.setHours(0,0,0,0);
      return date.getTime() === dateComparison.getTime()
    }, this);

    //const rooms = [...new Set(this.state.bookings.map(item => {name: item.room.name, imageURL: item.room.imageUrl}))];
    var rooms = Array.from(new Set(this.state.bookings.map((item) => {return {name: item.room.name, imageURL: item.room.imageUrl}} )));
    let roomMap = new Map();

    rooms.filter(el => { 
      const val = roomMap.get(el.name); 
      if(!val) { 
        roomMap.set(el.name, el.imageURL); 
        return true; 
      }
    });

    return (
      <div className="App">
          <div className="header-block grid grid-template--two">
            <div className="title">
              <RoomTitle />
              <AppTitle />
            </div>
            <div className="menu">
              <BookRoom updateActiveState={this.updateActiveState} />
            </div>
          </div>
          <div className="calendar-container">
              <div className="grid grid-template--two">
                <div>
                <MonthToggles currentDate={this.state.currentDate} toggleMonth={this.toggleMonth} />
                {this.state.active === "day" ? <DayToggles toggleDate={this.toggleDate} convertHours={this.convertHours} currentDate={this.state.currentDate} /> : ''}
                </div>
                <ViewToggles updateActiveState={this.updateActiveState} active={this.state.active} />
              </div>
          { (() => {
            switch(this.state.active){
              case "month":
                return <Calendar bookings={this.state.bookings} convertHours={this.convertHours} currentDate={this.state.currentDate} />
              case "day":
                return <DayView active={this.state.active} convertHours={this.convertHours} failureMessage={this.failureMessage} showBookings={showBookings} rooms={roomMap} toggleDate={this.toggleDate} currentDate={this.state.currentDate} />
              case "booking":
                return <SubmitNewBooking updateArray={this.updateArray} />
              default:
                //do nothing
            }
          } )()
        }
          </div>
      </div>
    );
  }
}

export default App;
