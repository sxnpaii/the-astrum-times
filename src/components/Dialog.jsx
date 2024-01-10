import sass from "../assets/styles/components/Dialog.module.scss";

const Dialog = ({ message = "", funcs, states, isInfo }) => {
  if (states.isDialogOpen) {
    return (
      <div className={sass.Dialog}>
        <div className={sass.InnerDialog}>
          <div className={sass.Message}>
            {isInfo ? (
              <a
                href={`/posts/${message.id}`}
                className={sass.FreshPostLink}
                target="_blank"
                rel="noreferrer"
              >
                Congrats ! Let's see fresh post!
                <br />
                https://localhost:5173/posts/{`${message.id}`}
              </a>
            ) : (
              <p>Confirm your action .</p>
            )}
          </div>
          <div className={sass.Actions}>
            {!isInfo && funcs ? (
              <div className={sass.Actions}>
                <button
                  className={sass.Btn}
                  onClick={() => {
                    states.setIsDialogOpen(false);
                    return funcs.Cancel;
                  }}
                >
                  Cancel
                </button>
                <button
                  className={sass.ActiveBtn}
                  onClick={() => 
                    states.setIsDialogOpen(false) && funcs.Ok
                  }
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                className={sass.ActiveBtnInfo}
                onClick={() => states.setIsDialogOpen(false)}
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else null;
};

export default Dialog;
