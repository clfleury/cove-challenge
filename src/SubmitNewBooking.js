import React from 'react';

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
      default:
        // do nothing
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

export default SubmitNewBooking;
