import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../actions/playerActions';
import PropTypes from 'prop-types';
import ReactExport from "react-export-excel";
import FontAwesome from 'react-fontawesome';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
 
class ExcelExport extends Component {

    componentDidMount() {
        this.props.getPlayers();
    }

    render() {
        const { players } = this.props.player;
        return(
            <Fragment>
            <span className="export-text">Export do xsl: </span><ExcelFile element={<FontAwesome
                                    className='export-icon'
                                    name='file'
                                    alt='Export do excelu'
                                    size='1x'
                                />}>
                <ExcelSheet data={players} name="Employees">
                    <ExcelColumn label="Nick" value="name"/>
                    <ExcelColumn label="DKP" value="net"/>
                </ExcelSheet>
            </ExcelFile>
            </Fragment>
        );
    }
}

ExcelExport.propTypes = {
    getPlayers: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    player: state.player
});

export default connect(mapStateToProps, { getPlayers })(ExcelExport);