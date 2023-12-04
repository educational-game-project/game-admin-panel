import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentData from '../../data/STUDENT_DATA.json';
import { StudentProps } from '../../interfaces/api';

function EditStudent() {
  const { studentId } = useParams();
  const [student, setStudent] = useState<StudentProps | undefined>();

  useEffect(() => {
    const foundStudent = studentData.find((user) => user._id === studentId);
    setStudent(foundStudent);
  }, [studentId]);
  return (
    <div>
      <div className="">
        <h5 className="font-semibold text-3xl mb-1.5">Edit Siswa</h5>
        <p className="text-gray-500">Edit data siswa.</p>
        <p className="">ID: {studentId}</p>
        <p className="">Nama: {student?.name}</p>
      </div>
    </div>
  );
}

export default EditStudent;
