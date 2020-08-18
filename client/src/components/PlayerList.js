import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../actions/playerActions';
import PropTypes from 'prop-types';
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('dkpStyle', {
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    background: {
      default: 'rgba(0,0,0,.1)',
    },
    context: {
      background: 'blue',
      text: '#FFFFFF',
    },
    divider: {
      default: '#fff',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

const columns = [
    {
        name: 'Nick',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Class',
        selector: 'classType',
        sortable: true,
    },
    {
        name: 'DKP',
        selector: 'net',
        sortable: true,
    },
    {
        name: 'DKP Spent',
        selector: 'spent',
        sortable: true,
    },
    {
        name: 'DKP Lifetime',
        selector: 'total',
        sortable: true,
    },
  ];
 
class PlayerList extends Component {

    componentDidMount() {
        this.props.getPlayers();
    }

    render() {
        const { players } = this.props.player;
        return(
            <DataTable
                title="Black Division - R2 DKP"
                columns={columns}
                data={players}
                maxWidth="500px"
                theme="dkpStyle"
            />
        );
    }
}

PlayerList.propTypes = {
    getPlayers: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    player: state.player
});

export default connect(mapStateToProps, { getPlayers })(PlayerList);