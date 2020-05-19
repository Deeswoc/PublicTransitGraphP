import React, { createContext, Component } from 'react'
import d from '../devURL';
export const NewTownFormContext = createContext();


class NewTownFormContextProvider extends Component {
 

    

    setCategory = (category)=>{
        this.setState({category});
    }

    resetForm = ()=>{
        let LocCat = [];
        this.state.catList.forEach((category) => {LocCat.push(category)});
        this.state.categories.forEach((category) => {LocCat.push(category)});

        this.setState({
            name:'',
            parish:'',
            catList: LocCat,
            categories: []
        })
    }

    updateTown = (e) =>{
        this.setState({town: e.target.value});
        console.log(this.state.town);
    }
    updateParish = (e) =>{
        this.setState({parish: e.target.value});
        console.log(this.state.parish);
    }

    addCategory = (cat) =>{
        if(this.state.catList.length>0){
            let catList = this.state.catList.filter(c => c.localeCompare(cat)!==0)
            let categories = this.state.categories;
            categories.push (cat);
    
            this.setState({categories});
            this.setState({catList});
            console.log(this.state.category);
        }
    }

    addTownToSubmit = () => {
        let town = {
            name: this.state.town,
            parish: this.state.parish,
            categories: this.state.categories
        }
        let townsToSubmit = [...this.state.townsToSubmit, town];
        this.setState({townsToSubmit});
        this.resetForm();
    }

    removeCategory = (cat) =>{
        if(this.state.categories.length>0){
            let categories = this.state.categories.filter(c => c.localeCompare(cat)!==0);
            let catList = this.state.catList;
            catList.push(cat);
            this.setState({catList});
            this.setState({categories});
        }
    }

    

    submit = async (e) => {
        e.preventDefault();
        let town = {
            name: this.state.town,
            parish: this.state.parish,
            categories: this.state.categories
        }
        this.setState({towns: [...this.state.towns, town]})
        
        // try{
        //     let res = await fetch(`${d}/town/add-towns`, {
        //         method: 'POST',

        //         headers: {
        //             'Content-Type':'application/json', 
        //         },
        //         body: JSON.stringify({towns})
        //     });
        //     let data = await res.json();
        //     alert(`Status ${res.status}`);
        //     if(res.status > 200 && res.status < 300){
        //         alert("Added Successfully");
        //     }else{
        //         alert(`${data}`);
        //     } 
        // }catch(error){
        //     console.log(error);
        //     alert(error);
        // }
    }

    async componentDidMount(){
        let data = await fetch(`${d}/town/get-categories`);
        let catList = await data.json();
        this.setState({ catList });
    }
    render(){
        return(
            <NewTownFormContext.Provider value={{...this.state  }}>
                {this.props.children}
            </NewTownFormContext.Provider>  
        );
    };

    state = {
        towns:[],
        name: '',
        parish: '',
        category: '',
        townsToSubmit: [],
        
        categories:[],
        catList:[],
        addTownToSubmit: this.addTownToSubmit,
        removeCategory: this.removeCategory,
        resetForm: this.resetForm,
        updateTown: this.updateTown,
        updateParish: this.updateParish,
        addCategory: this.addCategory,
        submit: this.submit,
        setCategory: this.setCategory
    }
}

export default NewTownFormContextProvider;