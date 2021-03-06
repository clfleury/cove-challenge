import React from 'react';

class DayView extends React.Component {
  render(){

    var times = [
    '8:00:00', '8:15:00', '8:30:00', '8:45:00', 
    '9:00:00', '9:15:00', '9:30:00', '9:45:00', 
    '10:00:00', '10:15:00', '10:30:00', '10:45:00',
    '11:00:00', '11:15:00', '11:30:00', '11:45:00',
    '12:00:00', '12:15:00', '12:30:00', '12:45:00',
    '13:00:00', '13:15:00', '13:30:00', '13:45:00',
    '14:00:00', '14:15:00', '14:30:00', '14:45:00',
    '15:00:00', '15:15:00', '15:30:00', '15:45:00',
    '16:00:00', '16:15:00', '16:30:00', '16:45:00',
    '17:00:00', '17:15:00', '17:30:00', '17:45:00',
    '18:00:00', '18:15:00', '18:30:00', '18:45:00',
    '19:00:00', '19:15:00', '19:30:00', '19:45:00',
    '20:00:00', '20:15:00', '20:30:00', '20:45:00',
    '21:00:00', '21:15:00', '21:30:00', '21:45:00',
    '22:00:00', '22:15:00', '22:30:00', '22:45:00',
    '23:00:00', '23:15:00', '23:30:00', '23:45:00'];

    //Format the currently selected date for display
    var formattedDate = this.props.currentDate.getFullYear()+'-'+(this.props.currentDate.getMonth()+1)+'-'+this.props.currentDate.getDate();

    var roomSet = Array.from(new Set(this.props.showBookings.map((item) => {return {name: item.room.name, imageURL: item.room.imageUrl}} )));
    console.log(this.props.showBookings);
   // console.log([...this.props.rooms]);

    return(
      <div>
          <div className="calendar-background">
          <div className="calendar-grid calendar-grid--dayview">
            { this.props.failureMessage() }
      {[...this.props.rooms].map(([name, imageURL]) => {
        return(
          <div className="calendar-grid__room">
            <div className="room-name">
            {name}
            </div>
            <div className="calendar-grid__room__data">
              <div class="calendar-grid__room__data__image">
              <img src={imageURL} alt={name} />
              </div>
              {times.map((item) => {
                return (
                  <div className="room-times"><div className="time">{item}</div>
                  {this.props.showBookings.map((booking) => {
                    return (<div className={booking.room.name === name && (new Date(formattedDate + ' ' + item).getTime() === new Date(booking.start).getTime() || 
                    (new Date(formattedDate + ' ' + item).getTime() > new Date(booking.start).getTime() && new Date(formattedDate + ' ' + item).getTime() < new Date(booking.end).getTime() )
                    )
                     ? "time-designation" : ''}>
                    </div>)
                  })}
                  </div>);
              })}
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
