import { Component } from 'react';
import {
  FormStyle,
  HeaderStyle,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

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
    this.props.onSubmit(this.state.searchQuery.toLowerCase().trim());
    this.formReset();
  };

  formReset = () => {
    this.setState({ searchQuery: '' });
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
              autoComplete="off"
              autoFocus
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
