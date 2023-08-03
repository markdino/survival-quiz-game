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

export const createRoom = ({
    name = "",
    creatorId,
    onSubmit = () => {},
    onSuccess = () => {},
    onFailed = () => {},
  }) => {
    onSubmit();
    axios
      .post(`/api/room/new`, { name, creatorId})
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch(({ response }) => {
        onFailed(response);
      });
  };

export const getRoomData = ({
    code,
    onSubmit = () => {},
    onSuccess = () => {},
    onFailed = () => {},
  }) => {
    onSubmit();
    axios
      .get(`/api/room/${code}`)
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch(({ response }) => {
        onFailed(response);
      });
  };

  export const getQuiz = ({
    exclude = [],
    onSubmit = () => {},
    onSuccess = () => {},
    onFailed = () => {},
  }) => {
    onSubmit();
    axios
      .get(`/api/quiz?exclude=${exclude.join(",")}`)
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch(({ response }) => {
        onFailed(response);
      });
  };

  export const revealQuiz = ({
    id,
    onSubmit = () => {},
    onSuccess = () => {},
    onFailed = () => {},
  }) => {
    onSubmit();
    axios
      .post(`/api/quiz/reveal`, { id })
      .then(({ data }) => {
        onSuccess(data);
      })
      .catch(({ response }) => {
        onFailed(response);
      });
  };

export const joinRoom = ({
  roomId,
  userId,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .patch(`/api/room/${roomId}/participant`, { user: userId })
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};

export const submitAnswer = ({
  roomId,
  userId,
  answer,
  onSubmit = () => {},
  onSuccess = () => {},
  onFailed = () => {},
}) => {
  onSubmit();
  axios
    .patch(`/api/room/${roomId}/participant`, { user: userId, answer })
    .then(({ data }) => {
      onSuccess(data);
    })
    .catch(({ response }) => {
      onFailed(response);
    });
};
