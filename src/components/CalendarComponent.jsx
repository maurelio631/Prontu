import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { errorAlert } from '../utils/Alerts';

const DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
const HOURS = Array.from({ length: 10 }, (_, i) => `${i + 8}:00 - ${i + 9}:00`);
const HOURS_COLUMN = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

const consultType = [
    { id: 'fistConsult', value: '1° Consulta' },
    { id: 'fistReturn', value: '1° Retorno' },
    { id: 'return', value: 'Retorno' },
    { id: 'plan', value: 'Plano' },
];

export function CalendarComponent() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [week, setWeek] = useState([]);
    const [openEventModal, setOpenEventModal] = useState(false);
    const [selectedEventIndex, setSelectedEventIndex] = useState(null);
    const [events, setEvents] = useState([{
        event_id: 1,
        event_consultType: "1° Retorno",
        event_dateForListing: "Wed Jun 05 2024",
        event_dayConsult: "qua., 5 de junho",
        event_hourConsult: "11:00 - 12:00",
        event_notes: "nota",
        event_patientName: "Rafael Melo",
        event_phone: "11999339613"
    }]);

    const [newEvent, setNewEvent] = useState({
        id: '',
        patientName: '',
        dateForListing: '',
        dayConsult: '',
        hourConsult: '',
        consultType: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        updateWeek();
    }, [currentDate]);

    const updateWeek = () => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const weekArray = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
        setWeek(weekArray);
    };

    const isToday = (date) => {
        const today = new Date();
        return today.toDateString() === date.toDateString();
    };

    const handlePreviousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const handleCurrentDate = () => {
        const newDate = new Date();
        setCurrentDate(newDate);
    };

    const showEventModal = (date, hour) => {
        const eventExists = events.some(event =>
            new Date(event.event_dateForListing).toDateString() === date.toDateString() &&
            event.event_hourConsult === hour
        );

        if (eventExists) {
            return;
        }

        setNewEvent({
            ...newEvent,
            dateForListing: date.toDateString(),
            dayConsult: date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' }),
            hourConsult: hour
        });
        setOpenEventModal(true);
    };
    const handleEventClick = (eventIndex) => {
        setSelectedEventIndex(selectedEventIndex === eventIndex ? null : eventIndex);
    };

    const handleRemoveEvent = (event_id) => {
        setEvents(events.filter(event => event.event_id !== event_id));
        setSelectedEventIndex(null);
    };

    const handleStartAppointment = (eventIndex) => {
        console.log(events)
    };

    const handleUnmarkEvent = (eventIndex) => {
        console.log(week)

    };


    const addEvent = () => {
        if (newEvent.patientName === '' || newEvent.consultType === '') {
            const msgError = `Preencha os campos:
            ${newEvent.patientName === '' ? 'Nome,' : ''}${newEvent.consultType === '' ? ' Tipo de consulta' : ''}`
            errorAlert(msgError)
            return;
        }

        const eventExists = events.some(event =>
            new Date(event.event_dateForListing).toDateString() === newEvent.dateForListing &&
            event.event_hourConsult === newEvent.hourConsult
        );

        if (eventExists) {
            errorAlert('Já existe um evento agendado para este horário.');
            return;
        }

        setEvents([...events, {
            event_id: Math.floor(Math.random() * 10) + 1,
            event_patientName: newEvent.patientName,
            event_dateForListing: newEvent.dateForListing,
            event_dayConsult: newEvent.dayConsult,
            event_hourConsult: newEvent.hourConsult,
            event_consultType: newEvent.consultType,
            event_phone: newEvent.phone,
            event_notes: newEvent.notes,
        }]);
        setNewEvent({
            patientName: '',
            dateForListing: '',
            dayConsult: '',
            hourConsult: '',
            phone: '',
            notes: ''
        });
        setOpenEventModal(false);
    };


    return (
        <section className='w-full'>
            <div className="container mx-auto px-4 m-4">
                <div className="bg-white rounded-lg shadow overflow-hidden">

                    <div className="flex items-center justify-between py-2 px-6">
                        <div className='flex gap-5'>
                            <div onClick={handleCurrentDate} className='px-6 flex items-center text-base font-semibold cursor-pointer  bg-azul-900/20 text-azul-900 border border-azul-900 rounded-lg'>
                                <span >Hoje</span>
                            </div>

                            <div className="bg-azul-900 rounded-lg border border-[#93C4F1]">
                                <button
                                    type="button"
                                    className={`p-2.5 rounded-s-lg transition hover:bg-black/20 border-r border-[#93C4F1] `}
                                    onClick={handlePreviousWeek}
                                >
                                    <FaChevronLeft className="text-white " />
                                </button>
                                <button
                                    type="button"
                                    className={`p-2.5 rounded-e-lg transition hover:bg-black/20 `}
                                    onClick={handleNextWeek}
                                >
                                    <FaChevronRight className="text-white  " />
                                </button>
                            </div>

                            {week.length > 0 && (
                                <div className='px-2.5 flex items-center gap-1 text-base font-medium  bg-azul-900/10 text-azul-900 border border-azul-900 rounded-lg'>
                                    <span className="capitalize">{week[0].toLocaleDateString('pt-BR', { month: 'long' })}</span>
                                    <span>de {week[0].toLocaleDateString('pt-BR', { year: 'numeric' })}</span>
                                </div>
                            )}
                        </div>
                        {/* <div>
                            adicionar botão
                        </div> */}
                    </div>

                    <div className="-mx-1 -mb-1">
                        <div className="flex">
                            {/* Coluna dos Horários */}
                            <div className="w-[10%] flex flex-col">
                                <div className="h-12"></div>
                                {HOURS_COLUMN.map((hour, hourIndex) => (
                                    <p key={hourIndex} className="h-20 font-semibold flex items-center justify-center text-gray-600">
                                        {hour}
                                    </p>
                                ))}
                            </div>

                            {/* Coluna dos Dias */}
                            {week.map((date, dateIndex) => (
                                <div key={dateIndex} className="w-[12.85%] relative pr">
                                    <div className="flex flex-col h-full">


                                        <div className={`text-gray-600 text-sm tracking-wide font-normal text-center`}>
                                            {DAYS[date.getDay()]}
                                        </div>
                                        <div className="flex justify-center items-center mt-1 mb-4">
                                            <span className={`${isToday(date) ? 'text-azul-900' : 'text-gray-600'} text-3xl tracking-wide font-normal`}>{date.getDate()}</span>
                                        </div>



                                        {HOURS.map((hour, hourIndex) => (
                                            <div key={hourIndex} className="border h-20 relative mr" onClick={() => showEventModal(date, hour)}>
                                                {events.filter(e => new Date(e.event_dateForListing).toDateString() === date.toDateString() && e.event_hourConsult === hour).map((event, eventIndex) => (
                                                    <div
                                                        key={event.event_id}
                                                        className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border text-white
                                                        ${event.event_consultType === '1° Consulta' ? 'bg-[#A95ADA]' : ''}
                                                        ${event.event_consultType === '1° Retorno' ? 'bg-[#DA5AB6]' : ''}
                                                        ${event.event_consultType === 'Retorno' ? 'bg-[#5A9CDA]' : ''}
                                                        ${event.event_consultType === 'Plano' ? 'bg-[#5ADA76]' : ''}`}
                                                        onClick={() => handleEventClick(event.event_id)}
                                                    >
                                                        <h3 className="text-base font-semibold truncate leading-tight">{event.event_patientName}</h3>
                                                        <p className='text-xs bg-white/30 px-1 rounded inline-block'>{event.event_consultType}</p>
                                                        <p className='text-xs'>{event.event_hourConsult}</p>

                                                        {selectedEventIndex === event.event_id && (
                                                            <div className="bottom-0- w-44 -left-2 bg-white rounded-lg p-2 shadow-[0px_3px_10px_0px_#000000b2] absolute z-10 flex flex-col gap-2" key={event.event_id}>
                                                                <button
                                                                    className="bg-vermelho-900 text-white px-2 py-2 rounded"
                                                                    onClick={() => handleRemoveEvent(event.event_id)}
                                                                >
                                                                    Remover da agenda
                                                                </button>
                                                                <button
                                                                    className="bg-verde-900 text-white px-2 py-2 rounded"
                                                                    onClick={() => handleStartAppointment(event.event_id)}
                                                                >
                                                                    Iniciar atendimento
                                                                </button>
                                                                <button
                                                                    className="bg-yellow-500 text-white px-2 py-2 rounded"
                                                                    onClick={() => handleUnmarkEvent(event.event_id)}
                                                                >
                                                                    Desmarcar
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {openEventModal && (
                    <div className="bg-[#000000cc] fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
                        <div className="p-4 max-w-xl mx-auto relative left-0 right-0 overflow-hidden mt-24">
                            <div className="shadow w-full rounded-lg bg-white overflow-hidden block p-8">
                                <label htmlFor="patientName" className='w-full pb-2'>
                                    <input
                                        type="text"
                                        id='patientName'
                                        name='patientName'
                                        className='w-full border-b border-black pb-2 mb-6 text-xl'
                                        placeholder='Nome do paciente'
                                        value={newEvent.patientName}
                                        onChange={(e) => setNewEvent({ ...newEvent, patientName: e.target.value })}
                                    />
                                </label>

                                <div className='flex gap-5'>
                                    <input
                                        type="text"
                                        id='dayConsult'
                                        name='patientName'
                                        className="w-full bg-[#F6FAFD] border border-cinza-700 rounded-lg p-2 outline-none text-center"
                                        value={newEvent.dayConsult}
                                        readOnly
                                    />

                                    <input
                                        type="text"
                                        id='hourConsult'
                                        name='hourConsult'
                                        className="w-full bg-[#F6FAFD] border border-cinza-700 rounded-lg p-2 outline-none hover:border-azul-900 text-center"
                                        value={newEvent.hourConsult}
                                        readOnly
                                    />
                                </div>

                                <div className='flex justify-between my-8'>
                                    {consultType.map((consult) => (
                                        <label htmlFor={consult.id} className='text-sm font-medium' key={consult.id}>
                                            <input
                                                type="radio"
                                                name='consultType'
                                                id={consult.id}
                                                className='mr-2'
                                                value={consult.value}
                                                onChange={(e) => setNewEvent({ ...newEvent, consultType: e.target.value })}
                                            />
                                            {consult.value}
                                        </label>
                                    ))}
                                </div>

                                <label htmlFor="tel" className='flex items-center mb-5'>
                                    <p className='w-full max-w-24'>Tel. Contato</p>
                                    <input
                                        type="text"
                                        id='tel'
                                        name='tel'
                                        className="w-full bg-[#F6FAFD] border border-cinza-700 rounded-lg p-2 outline-none hover:border-azul-900 mt-2"
                                        onChange={(e) => setNewEvent({ ...newEvent, phone: e.target.value })}
                                    />
                                </label>

                                <label htmlFor="notes" className='flex items-center '>
                                    <p className='w-full max-w-24'>Anotações</p>
                                    <input
                                        type="text"
                                        id='notes'
                                        name='notes'
                                        className="w-full bg-[#F6FAFD] border border-cinza-700 rounded-lg p-2 outline-none hover:border-azul-900 mt-2"
                                        onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                                    />
                                </label>

                                <div className="flex justify-between mt-10">
                                    <button
                                        type="button"
                                        className="bg-white hover:bg-gray-100 text-azul-900 font-semibold py-2 px-4 border border-azul-900 rounded-lg shadow-sm mr-2"
                                        onClick={() => setOpenEventModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        className="bg-azul-900 hover:bg-azul-900/80 text-white font-semibold py-2 px-4 rounded-lg shadow-sm"
                                        onClick={addEvent}
                                    >
                                        Agendar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
