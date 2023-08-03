import axios from "axios";

export const getUserById = ({
  id,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .get(`/api/user/${id}`)
    .then(({ data }) => {
      const { _id, ...restData } = data;
      const newData = { id: _id, ...restData };
      onSuccess(newData);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};

export const signInUser = ({
  userData,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .post(`/api/user`, userData)
    .then(({ data }) => {
      const { _id, ...restData } = data;
      const newData = { id: _id, ...restData };
      onSuccess(newData);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};
