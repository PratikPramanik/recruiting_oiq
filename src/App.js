import { useState, useEffect } from 'react';


export function App() {
  return (
    <div className="App p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <CandidateReview />
    </div>
  );
}


export function CandidateList({candidates, updateCandidate}){
  function editCandidate(key){
    candidates[key].approved = !candidates[key].approved;
    updateCandidate(candidates[key])
  }

  if(candidates){
    let listItems = [];

    Object.keys(candidates).forEach((c) => {
      const candidate = candidates[c];
      const first = candidate.first;
      const last = candidate.last;
      const email = candidate.email;
      const note = candidate.note;
      const approved = candidate.approved ? 'Approved' : 'Rejected';

      listItems.push(
        <li key={c} className="candidate-card">
          <div>{first} {last}: {email} </div>
          <div>
            <span className={approved}>{approved}</span>: <span>{note} </span>
            <button onClick={() => editCandidate(c)}>Switch</button>
            </div>
        </li>
      );
    });

    return (
      <div className="candidate-list">
        <hr></hr>
        <h2>Reviewed</h2>
        <ul>{listItems}</ul>
      </div>
    );
  }
  return (<p className='empty-data'>No candidates to list.</p>);
}


export function NewCandidateCard({updateCandidate}){
  const [note, setNote] = useState('');
  let [user, setUsers] = useState(0);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => setUsers(data.results));
  }, []);

  let content = (<p className='empty-data'>loading...</p>);

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  function setCandidate(approved){
    const candidate = {
      'first': user.name.first,
      'last': user.name.last,
      'email': user.email,
      'note': note,
      'approved': approved,
      'uuid': user.login.uuid
    };
    updateCandidate(candidate);
    setNote('');
    getNewUser();
  }

  function getNewUser(){
    setUsers(() => {
      fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => setUsers(data.results));
    }, []);
  }

  if(user && user.length == 1){
    user = user[0]
    content = (
      <div className='candidate-card'>
        <h2>{user.name.first} {user.name.last}</h2>
        <p>email: {user.email}</p>
        <h3>Add note:</h3>
        <input
          type='text'
          onChange={handleChange}
          value={note}
          className="candidate-text-input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
        ></input>
        <button
          className="candidate-button approve"
          onClick={() => setCandidate(true)}>
            Approve
        </button>
        <button
          className="candidate-button reject"
          onClick={() => setCandidate(false)}>
            Reject
        </button>
      </div>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
}


export function CandidateReview() {
  let [candidates, setCandidates] = useState({});
  candidates = JSON.parse(localStorage.getItem('candidate_store'));

  function updateCandidate(candidate){
    let newCandList = candidates ? candidates : {};
    newCandList[candidate.uuid] = candidate;
    localStorage.setItem('candidate_store', JSON.stringify(newCandList))
    setCandidates(candidates => ({
      ...candidates,
      ...newCandList
    }));
  };

  return (
    <div className="Candidate max-w-xl full-w">
      <h1>Review Candidates</h1>
      <NewCandidateCard updateCandidate={updateCandidate}/>
      <CandidateList candidates={candidates} updateCandidate={updateCandidate}/>
    </div>
  );
}
