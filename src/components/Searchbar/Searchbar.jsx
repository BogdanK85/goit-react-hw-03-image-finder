import { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  FormStyle,
  HeaderStyle,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onFormChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value });
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.info('field must be filled in');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.onFormReset();
  };

  onFormReset = () => {
    this.state({ searchQuery: '' });
  };

  render() {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <HeaderStyle>
          <FormStyle onSubmit={this.onFormSubmit}>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and pictures"
              onChange={this.onFormChange}
              value={this.state.searchQuery}
            />
          </FormStyle>
        </HeaderStyle>
      </>
    );
  }
}
