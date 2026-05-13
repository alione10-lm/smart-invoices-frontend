
const Alert = ({ success, message }) => {
  return (
    <div className="absolute top-20 right-5 z-50">
      {success === true ? (
        <div
          className="w-full px-4 py-3 text-sm border rounded border-emerald-100 bg-emerald-50 text-emerald-500"
          role="alert"
        >
          <p>{message}</p>
        </div>
      ) : (
        <div
          className="w-full px-4 py-3 text-sm text-pink-500 border border-pink-100 rounded bg-pink-50"
          role="alert"
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
