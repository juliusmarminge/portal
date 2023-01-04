import { Role, User } from "@prisma/client";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { rbac } from "../components/RBACWrapper";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { trpc } from "../utils/trpc";
import {
  FiPlusCircle,
  FiMinusCircle,
  FiAlertCircle,
  FiStopCircle,
  FiXCircle,
} from "react-icons/fi";
import { useSession } from "next-auth/react";

enum ActionType {
  Add,
  Remove,
}
type Action = {
  actionType: ActionType;
  user: User;
  role: Role | undefined;
};

const Roles: NextPage = () => {
  const session = useSession();
  const [role, setRole] = useState("");
  const [action, setAction] = useState<Action | undefined>(undefined);

  const { data, isLoading, isError, refetch } = trpc.useQuery([
    "user.byRole",
    { role: role ? (role.toUpperCase() as keyof typeof Role) : null },
  ]);

  const addRole = trpc.useMutation(["user.addRole"]);
  const removeRole = trpc.useMutation(["user.removeRole"]);

  return (
    <>
      <label className="label">
        <span className="label-text">Role:</span>
      </label>
      <input
        type="text"
        name="role"
        className="input input-bordered w-full max-w-xs"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setRole(e.currentTarget.value);
          }
        }}
      />
      <br />
      {/* {JSON.stringify(data)} */}
      {isError ? <span className="text-error">Role not found!</span> : null}
      {isLoading ? (
        <progress className="progress" />
      ) : (
        <table className="table-zebra table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            src={user.image || ""}
                            alt={user.name || ""}
                            layout="fill"
                          />
                        </div>
                      </div>
                      <div>
                        <div>{user.name}</div>
                        {user.id === session.data?.user?.id ? (
                          <div className="font-bold">(YOU)</div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td className="flex-auto space-x-1">
                    {user.role.map((role) => {
                      if (
                        action?.actionType === ActionType["Remove"] &&
                        action.user === user &&
                        action.role === role
                      ) {
                        return (
                          <button
                            className="btn btn-error btn-sm"
                            key={role}
                            onClick={async () => {
                              // guard action.role against undefined
                              if (!action.role) return;

                              await removeRole.mutateAsync({
                                id: action.user.id,
                                role: action.role,
                              });
                              setAction(undefined);
                              await refetch();
                            }}
                          >
                            <FiXCircle /> &nbsp; Sure?
                          </button>
                        );
                      } else {
                        return (
                          <button
                            className="btn btn-sm"
                            key={role}
                            onClick={() => {
                              // console.log(user.email, role);
                              setAction({
                                actionType: ActionType["Remove"],
                                user: user,
                                role: role,
                              });
                            }}
                          >
                            <FiMinusCircle /> &nbsp; {role}
                          </button>
                        );
                      }
                    })}
                    {action?.actionType === ActionType["Add"] &&
                    action.user === user ? (
                      <input
                        type="text"
                        className="input input-bordered"
                        onKeyDown={async (e) => {
                          console.log(e.key);
                          if (e.key === "Enter") {
                            await addRole.mutateAsync({
                              id: user.id,
                              role: e.currentTarget.value.toUpperCase() as keyof typeof Role,
                            });
                            setAction(undefined);
                            await refetch();
                          }
                        }}
                      />
                    ) : (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => {
                          setAction({
                            actionType: ActionType["Add"],
                            user: user,
                            role: undefined,
                          });
                        }}
                      >
                        <FiPlusCircle /> &nbsp; Add Role
                      </button>
                    )}
                    {action ? (
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => {
                          setAction(undefined);
                        }}
                      >
                        <FiStopCircle /> &nbsp; Cancel
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let output: GetServerSidePropsResult<Record<string, unknown>> = { props: {} };
  output = rbac(
    await getServerAuthSession(context),
    ["ADMIN"],
    undefined,
    output
  );
  return output;
}

export default Roles;
