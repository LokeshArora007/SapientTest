import React from "react";
import "./style.css";
import Dispatcher from "./Dispatcher";
import FilterSetCheckbox from "./components/Filter/filterSetCheckbox";
import { fetchData } from "./API/api";
import MediaCard from "./components/Card/card";
import Grid from "@material-ui/core/Grid";
import SearchBox from "./components/SearchBox";
import ChipsArray from "./components/Chips/ChipsArray";
import Dropdown from "./components/Dropdown/Dropdown";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      actualResults: undefined,
      sFilter: undefined,
      gFilter: undefined,
      oFilter: undefined,
      results: undefined
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    fetchData()
      .then(data => {
        let species = [];
        let gender = [];
        let origin = [];
        if (data) {
          data.results.map(item => {
            if (item.species && species.indexOf(item.species) === -1)
              species.push(item.species);
            if (item.gender && gender.indexOf(item.gender) === -1)
              gender.push(item.gender);
            if (item.origin && origin.indexOf(item.origin.name) === -1)
              origin.push(item.origin.name);
          });
          console.log(species);
          console.log(gender);
          console.log(data.results);
        }
        this.setState({
          sFilter: species,
          gFilter: gender,
          oFilter: origin,
          actualResults: data.results,
          results: data.results
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          sFilter: undefined,
          gFilter: undefined,
          oFilter: undefined,
          actualResults: undefined,
          results: undefined
        });
      });
    Dispatcher.register("filter1:change", this.handleFilterChange);
    Dispatcher.register("filter2:change", this.handleFilterChange);
    Dispatcher.register("filter3:change", this.handleFilterChange);
  }

  componentWillUnmount() {
    Dispatcher.unregister("filter1:change", this.handleFilterChange);
    Dispatcher.unregister("filter2:change", this.handleFilterChange);
    Dispatcher.unregister("filter3:change", this.handleFilterChange);
  }

  handleFilterChange = (filterKey, filters) => {
    this.handleUpdate(filterKey, filters);
    setTimeout(() => {
      console.log(this.state.tags);
    }, 0);

    let filteredResults = this.state.actualResults.filter(item => {
      for (var i = 0; i < filters.length; i++) {
        if (filterKey === "origin" && item.origin.name === filters[i].label)
          return true;
        if (item[filterKey] === filters[i].label) return true;
      }
    });
    if (!filteredResults.length) filteredResults = this.state.actualResults;
    setTimeout(() => {
      this.setState({
        results: filteredResults
      });
    }, 0);
  };

  handleUpdate = (filterType, filters) => {
    this.setState(
      {
        tags: this.state.tags.filter(tag => tag.type !== filterType)
      },
      () => {
        let newTags = [...this.state.tags];
        for (var i = 0; i < filters.length; i++) {
          let tag = {
            key: newTags.length + 1,
            type: filterType,
            label: filters[i].label
          };
          newTags.push(tag);
        }
        this.setState({
          tags: newTags
        });
      }
    );
  };

  render() {
    let { sFilter, gFilter, oFilter, results, tags } = this.state;
    let cards = [];
    if (results) {
      results.map(item => {
        cards.push(
          <Grid item xs={12} sm={3}>
            <MediaCard data={item}></MediaCard>
          </Grid>
        );
      });
    }
    return (
      <div className="root">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <div className="filters">
              <h3>Species</h3>
              {sFilter && (
                <FilterSetCheckbox
                  title="Species"
                  name="species"
                  eventName="filter1"
                  filters={sFilter}
                />
              )}
              <h3>Gender</h3>
              {gFilter && (
                <FilterSetCheckbox
                  title="Gender"
                  name="gender"
                  eventName="filter2"
                  filters={gFilter}
                />
              )}
              <h3>Origin</h3>
              {oFilter && (
                <FilterSetCheckbox
                  title="Origin"
                  name="origin"
                  eventName="filter3"
                  filters={oFilter}
                />
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            {tags && <ChipsArray chips={tags}></ChipsArray>}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={9}>
                <span>Search by Name</span>
                <SearchBox
                  onSearchClick={inputValue => {
                    if (!inputValue) return;
                    let filteredResults = results.filter((item, index) => {
                      if (
                        item.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      )
                        return true;
                    });
                    this.setState({
                      results: filteredResults
                    });
                  }}
                ></SearchBox>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Dropdown
                  onItemChange={value => {
                    switch (value) {
                      case "Ascending":
                        {
                          results.sort((a, b) => (a.id > b.id ? 1 : -1));
                        }
                        break;
                      case "Descending":
                        {
                          results.sort((a, b) => (a.id < b.id ? 1 : -1));
                        }
                        break;
                    }
                    this.setState({
                      results: results
                    });
                  }}
                ></Dropdown>
              </Grid>
            </Grid>
            {results && (
              <Grid container spacing={3}>
                {cards}
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
