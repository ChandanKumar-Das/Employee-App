const DeleteEmployee = ({ show, onClose, onDelete, itemId  }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
          <p>Are you sure you want to delete this item?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={()=>onDelete(itemId )}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteEmployee;