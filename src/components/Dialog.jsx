import sass from "@/assets/styles/components/Dialog.module.scss";
import Link from "next/link";

const Dialog = ({ message = "", funcs, states, isInfo, isDeleteConfirm }) => {
  const handleClick = () => {
    funcs.Ok();
    states.setIsDialogOpen(false);
  };
  if (states.isDialogOpen) {
    return (
      <div className={sass.Dialog}>
        <div className={sass.InnerDialog}>
          <div className={sass.Message}>
            {isInfo ? (
              <Link
                href={`/posts/${message.id}`}
                className={sass.FreshPostLink}
                target="_blank"
                rel="noreferrer"
              >
                Congrats! Let&apos;s see live post!
                <br />
                {process.env.NEXT_PUBLIC_URL}/posts/{`${message.id}`}
              </Link>
            ) : (
              <p className="text-2xl">Confirm your action</p>
            )}
            {message && (
              <p className="text-2xl">The post with id {message} was deleted! </p>
            )}
          </div>
          <div className={sass.Actions}>
            {!isInfo ? (
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
                <button className={sass.ActiveBtn} onClick={handleClick}>
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
