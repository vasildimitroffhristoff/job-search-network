import React from 'react'

export default function Messages() {
  return (
    <div class="card card-body border-0 shadow-sm text-center p-4" role="alert">
        <i className="fas fa-envelope text-muted" style={{ fontSize: "40px" }}></i> <b className="d-inline text-muted">Your Inbox is empty.</b>
    </div>
  )
}
