/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { getQuestions } from '../assets/dataJson';
import Check from '../assets/check.png';
import X from '../assets/cerrar.png';
import { verifyToken } from '../api/auth';
import { saveResults } from '../api/client';
import Spinner from '../components/spinner';

const Alumno = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSelected, setIsSelected] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const [reload, setReload] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [data, setData] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await verifyToken(localStorage.getItem('token'));
      if (response.ok) {
        const dataRes = await response.json();
        if (dataRes.role !== 'client') navigate('/');
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        navigate('/');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/');
    validateToken();
    if (reload) {
      setQuestions(getQuestions());
      setReload(false);
      setShowResults(false);
      setCurrentQuestion(0);
      setIsSelected({});
      setShowConfetti(true);
      setShowAnswers(false);
      setData({});
    }
  }, [reload]);

  const save = async (result) => {
    try {
      const response = await saveResults(result);
      if (response.ok) {
        setShowSpinner(false);
      }
      setShowSpinner(false);
    } catch (error) {
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    if (showResults) {
      let correctAnswer = 0;
      questions.forEach((obj) => {
        if (obj.correctAnswer === isSelected[obj.question]) {
          correctAnswer += 1;
        }
      });
      setData({
        correctAnswer,
        totalQuestions: questions.length,
        wrongAnswer: questions.length - correctAnswer,
        percentage: correctAnswer / questions.length * 100,
      });
      // Guardar resultados
      setShowSpinner(true);
      save(correctAnswer / questions.length * 100);
      if (correctAnswer / questions.length * 100 < 83) setShowConfetti(false);
      const closeConfetti = () => setShowConfetti(false);
      setTimeout(closeConfetti, 5000);
    }
  }, [showResults]);

  if (!showResults) {
    return (
      <div className="p-2 lg:w-6/12 m-auto mt-6 lg:mt-24 bg-slate-200 rounded-md shadow-lg">
        <div className="text-lg p-2 text-black rounded-lg mb-4 font-semibold">
          <p>{questions[currentQuestion]?.question}</p>
        </div>
        <hr className="mb-3 border-slate-500" />
        <div className="my-4">
          {questions[currentQuestion]?.options.map((option) => (
            <div
              key={option}
              className={`${isSelected[questions[currentQuestion]?.question] === option ? 'bg-green-300' : ''} border border-black my-2 text-black hover:bg-green-300 p-3 rounded-lg lg:transition`}
              onClick={() => setIsSelected({ ...isSelected, [questions[currentQuestion]?.question]: option })}
            >
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <div className="my-4 flex justify-between items-center px-5">
          <div>
            {parseInt(currentQuestion / questions.length * 100, 10)}% completado
          </div>
          <div>
            <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(currentQuestion - 1)} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Anterior</button>
            <button
              onClick={() => (currentQuestion < questions.length - 1 ? setCurrentQuestion(currentQuestion + 1) : setShowResults(true))}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"

            >
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      {showSpinner && <Spinner />}
      {!showAnswers
        ? (
          <section className="mx-2 p-2 md:w-6/12 lg:w-4/12 m-auto mt-6 lg:mt-24 bg-slate-200 rounded-md shadow-lg">
            {showConfetti
              && (
                <Confetti
                  width={width}
                  height={height}
                  run
                />
              )}
            <div className="w-6/12 m-auto flex justify-center">
              <h2 className="text-2xl font-semibold mb-4 ">Resultados</h2>
            </div>
            <hr className="mb-3 border-slate-500" />
            <div className="lg:w-12/12 md:w-12/12 w-6/12 m-auto">
              <p className="">Respuestas correctas: {data.correctAnswer} </p>
              <p className="">Porcentaje: {data.percentage}%</p>
              <p className="t-center">Respuestas incorrectas: {data.wrongAnswer}</p>
              <p className="t-center">Aprobado: {data.percentage >= 83 ? 'Si!!' : 'No :*('}</p>
            </div>
            <hr className="my-3 border-slate-500" />
            <section className="flex justify-between">
              <button onClick={() => setShowAnswers(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Ver Respuestas</button>
              <button onClick={() => setReload(true)} className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Volver a comenzar</button>
            </section>
          </section>
        )
        : (
          <section className="mx-2 p-2 md:w-6/12 lg:w-4/12 m-auto mt-2 lg:mt-10 bg-slate-200 rounded-md shadow-lg">
            {questions.map((question) => (
              <div key={question.question} className="p-2 mb-4 text-black rounded-lg">
                <p className="">{question.question}</p>
                <div className="flex flex-col">
                  <p className="font-semibold underline">Respuesta:</p>
                  <div className="flex items-center">
                    <span className="font-semibold text-green-800">{isSelected[question.question]}</span>
                    <img
                      src={question.correctAnswer === isSelected[question.question] ? Check : X}
                      alt="check"
                      className="w-4 h-4 ms-6"
                    />
                  </div>
                </div>
              </div>
            ))}
            <hr className="my-3 border-slate-500" />
            <div className="flex justify-end">
              <button onClick={() => setReload(true)} className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Volver a comenzar</button>
            </div>
          </section>
        )}
    </div>
  );
};

export default Alumno;
