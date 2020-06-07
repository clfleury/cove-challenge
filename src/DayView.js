import React from 'react';

class DayView extends React.Component {
  render(){

    //Format the currently selected date for display
    var formattedDate = this.props.currentDate.getFullYear()+'-'+(this.props.currentDate.getMonth()+1)+'-'+this.props.currentDate.getDate();

    console.log(this.props.showBookings);

    var roomSet = Array.from(new Set(this.props.showBookings.map((item) => {return {name: item.room.name, imageURL: item.room.imageUrl}} )));
    console.log(roomSet);

    return(
      <div>
        <button className='date-toggle-left' style={{float: 'left'}} onClick={() => this.props.toggleDate('Past')}>Yesterday</button>
        <p>{formattedDate}</p>
        <button className='date-toggle-right' style={{float: 'right'}} onClick={() => this.props.toggleDate('Future')}>Tommorrow</button>
          <div className="calendar-background">
          <div className="calendar-grid calendar-grid--dayview">
            { this.props.failureMessage() }
      {roomSet.map((data, key) => {
        return(
          <div className="calendar-grid__room">
            <div className="room-name">
            {data.name}
            </div>
            <div className="calendar-grid__room__data">
              <div class="calendar-grid__room__data__image">
              <img src={data.imageURL} alt={data.name} />
              </div>
            </div>
          </div>
        )
      })}
      </div>
      </div>
      </div>
    )

    /*return(
    <div>
      <button className='date-toggle-left' style={{float: 'left'}} onClick={() => this.props.toggleDate('Past')}>Yesterday</button>
      <p>{formattedDate}</p>
      <button className='date-toggle-right' style={{float: 'right'}} onClick={() => this.props.toggleDate('Future')}>Tommorrow</button>
      <div style={{display: 'flex'}}>
          { this.props.failureMessage() }
          {this.props.showBookings.length > 0 ? this.props.showBookings.map(function(data, key){
          let formattedStartTime = new Date(data.start).getHours();
          let formattedEndTime = new Date(data.end).getHours();
          console.log(data.room.name);
          return (
            <div style={{width: '25%'}} key={key}>
              {data.room.name}
              <div className="rooms__roomBlock">
                <img src={data.room.imageUrl} style={{maxWidth: '100%'}} alt="meeting room" />
                {this.props.convertHours(formattedStartTime) + " - " + this.props.convertHours(formattedEndTime)}
              </div>
            </div>
          )
        }, this) : <p className='centered-p'>No bookings on this date.</p> }
      </div>
    </div>
  )*/

}
}

export default DayView;
