import React from "react";
import User from "./User";

export default function UserList() {
  return (
    <ul class="list-group list-group-flush">
      <li class="list-group-item mt-3 p-2">
        <User />
      </li>
      <li class="list-group-item mt-3 p-2">
        <User />
      </li>
      <li class="list-group-item mt-3 p-2">
        <User />
      </li>
      <li class="list-group-item mt-3 p-2">
        <User />
      </li>
      <li class="list-group-item mt-3 p-2">
        <User />
      </li>
    </ul>
  );
}
