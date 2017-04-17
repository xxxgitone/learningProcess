const Ninjas = React.createClass({

    getInitialState: function() {
        return ({
            ninjas: []
        })
    },

    handleSubmit: function(e) {
       e.preventDefault();
       const lng = this.refs.lng.value;
       const lat = this.refs.lat.value;

       fetch('/api/users?lng=' + lng + '&lat=' + lat).then(function(data) {
           return data.json();
       }).then(json => {
           this.setState({
               ninjas: json
           });
       })
    },

    render: function(){
        let ninjas = this.state.ninjas;
        ninjas = ninjas.map((ninja, index) => {
            return (
                <li key={index}>
                    <span className={ninja.obj.available}></span>
                    <span className="name">{ninja.obj.name}</span>
                    <span className="rank">{ninja.obj.rank}</span>
                     <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
                </li>
            );
        })

        return (
            <div id="ninj-container">
                <form id="search" onSubmit={ this.handleSubmit }>
                    <label>Enter Your latitude:</label>
                    <input type="text" ref="lat" placeholder="latitude" required/>
                    <label>Enter Your longitude:</label>
                    <input type="text" ref="lng" placeholder="longitude" required/>
                    <input type="submit" value="Find Ninjas"/>
                </form>
                <ul>{ ninjas }</ul>
            </div>
        );
    }
})

ReactDOM.render(<Ninjas />, document.getElementById('ninjas'));