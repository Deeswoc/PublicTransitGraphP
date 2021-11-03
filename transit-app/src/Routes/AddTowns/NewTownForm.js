import React, { Component, useEffect, useContext } from 'react'
import PropT from 'prop-types';
import MultiSelWindow from '../../Components/MultiSelectWindow'
import { NewTownFormContext } from '../../Contexts/NewTownFormContext';
import { actions } from '../../Contexts/NewTownFormContextReducers/newTownFormContextReducer';
import TownTable from '../../Components/TownTable';
import * as server from '../../api stuff/utils';

class NewTownForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            town: '',
            parish: '',
            category: ''
        }

    }
    form;
    render() {
        return (
            <NewTownFormContext.Consumer>{(context) => {
                const {
                    townsToSubmit,
                    parish,
                    name,
                    category,
                    submit,
                    dispatch,
                } = context;
                return (
                    <form className="container py-4" ref={(form) => this.form = form} onSubmit={submit}>

                        <div className="row py-2">
                            <div className="col-md-4">
                                <label htmlFor="Name">Name: </label>
                            </div>
                            <div className="col-md-8">
                                <input id="Name" type="Text" value={name} onChange={
                                    e => {
                                        dispatch({ type: actions.STATE, $: { name: e.target.value } });
                                    }
                                } required />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-4">
                                <label htmlFor="Parish">Parish: </label>
                            </div>
                            <div className="col-md-8">
                                <input id="Parish" type="Text" value={parish} onChange={
                                    e => {
                                        dispatch({ type: actions.STATE, $: { parish: e.target.value } });
                                    }
                                } required />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-4">
                                <label htmlFor="">Categories: </label>
                            </div>
                            <div className="col-md-8">
                                <LocCat></LocCat>
                                <MultiSelWindow />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex flex-row justify-content-center">


                                <button type="button" className="btn btn-primary mr-2" onClick={
                                    (e) => {
                                        dispatch({
                                            type: actions.ADD_CATEGORY, $: { category }
                                        })
                                    }}>Add Cat</button>
                                <button type="button" className="btn btn-primary mr-2" onClick={
                                    (e) => {
                                        dispatch({ type: actions.ADD_TOWN_SUBMITION });
                                        dispatch({ type: actions.RESET_FORM });
                                    }
                                }>Add Town</button>
                                <button type="submit" className="btn btn-primary mr-2" onClick={(e) => {
                                    e.preventDefault();
                                    let towns = {
                                        towns: townsToSubmit.map(town => {
                                            return {
                                                name: town.name,
                                                parish: town.parish,
                                                categories: town.categories.map(cat => cat.id)
                                            }
                                        })
                                    };

                                    server.addTown(towns)
                                        .then(r => { alert(r.status) });


                                }}>Submit</button>
                            </div>
                        </div>
                        <TownTable townList={townsToSubmit} />

                    </form>
                )
            }}</NewTownFormContext.Consumer>
        );
    }
}



function LocCat(props) {

    const { catList, dispatch } = useContext(NewTownFormContext);
    const onChange = (e) => {
        dispatch({ type: actions.STATE, $: { category: e.target.value } });
    }

    useEffect(() => {
        if (catList.length > 0)
            dispatch({ type: actions.STATE, $: { category: catList[0].id } });
    }, [catList, dispatch]);
    return (
        <select defaultValue={catList[0]} style={{ minWidth: 110 }} onChange={onChange}>
            {catList.sort().map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
        </select>
    )
}



NewTownForm.propTypes = {
    town: PropT.string,
    parish: PropT.string
}


export default NewTownForm;