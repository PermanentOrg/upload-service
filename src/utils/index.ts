interface SerializedError {
  details: {
    message: string;
    type: string;
  };
}

const serializeError = (err: Error): SerializedError => ({
  details: {
    message: err.message,
    type: err.name,
  },
});

export {
  serializeError,
};
