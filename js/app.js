window.addEventListener('load', function() {

  // SELECIONANDO SEDES E GERANDO DADOS 
  var select = document.getElementById('filter');
  select.addEventListener('change', optFilter);

  function optFilter() {
    var city = select.value;
    var opt = select.options[select.selectedIndex].dataset.year;
    var totalStudents = data[city][opt]['students'].length;
    var dataRatings = data[city][opt]['ratings'];
    var arrayStudents = data[city][opt]['students'];

    // INSCRIÇÕES //
    // VERIFICANDO A QUANTIDADE DE DESISTÊNCIAS
  
    var dropout = 0;
    for (var i = 0; i < arrayStudents.length; i++) {
      if (arrayStudents[i].active === false) {
        dropout++;
      }
    }
     //PORCENTAGENS DE ESTUDANTES DESISTENTES
    var dropoutPercent = ((dropout / totalStudents) * 100).toFixed(1) + '%';

    // TOTAL DE ESTUDANTES NO BOX
    var enrollmentStudents = document.getElementById('box-enrollment');
    enrollmentStudents.textContent = totalStudents;

    // PORCENTAGENS DE ESTUDANTES DESISTENTE
    var dropoutPorcentaje = document.getElementById('dropout-percent');
    dropoutPorcentaje.textContent = dropoutPercent;

    // DESTAQUES//
    var studentMeetTarget = 0;

    for (var i = 0; i < totalStudents; i++) {
      var scoreTech = 0;
      var scoreHSE = 0;

      for (var j = 0; j < arrayStudents[i]['sprints'].length; j++) {
        scoreTech += arrayStudents[i]['sprints'][j]['score']['tech'];
        scoreHSE += arrayStudents[i]['sprints'][j]['score']['hse'];
      }

      var averageTech = scoreTech / arrayStudents[i]['sprints'].length;
      var averageHSE = scoreHSE / arrayStudents[i]['sprints'].length;

      if (averageTech >= 1260 && averageHSE >= 840) {
        studentMeetTarget++;
      }
    }

    var boxAchievement = document.getElementById('box-achievement');
    boxAchievement.textContent = studentMeetTarget;

    var percentOfTotal = document.getElementById('percent-achievement');
    percentOfTotal.textContent = ((studentMeetTarget / totalStudents) * 100).toFixed(1);

    if (((studentMeetTarget / totalStudents) * 100).toFixed(1) < 70) {
      percentOfTotal.style.color = '#FF0000';
    } else if (((studentMeetTarget / totalStudents) * 100).toFixed(1) <= 80) {
      percentOfTotal.style.color = '#0404B4';
    } else if (((studentMeetTarget / totalStudents) * 100).toFixed(1) > 80) {
      percentOfTotal.style.color = '#228B22';
    }

    var changeInfoTotal = document.getElementById('total-achievement');
    changeInfoTotal.textContent = '% TOTAL (' + totalStudents + ')';

    //PONTUAÇÃO MÉDIA DOS MENTORES
    var sumTeacherRating = 0;

    for (var i = 0; i < dataRatings.length; i++) {
      sumTeacherRating += dataRatings[i]['teacher'];
    }

    var overallTeacherRating = sumTeacherRating / dataRatings.length;
    var teacherRating = document.getElementById('teacher-rating');
    teacherRating.textContent = overallTeacherRating.toFixed(1);

    // NPS
    var npsProm = document.getElementById('promoters');
    var npsPass = document.getElementById('passive');
    var npsDetr = document.getElementById('detractor');
    var nps = document.getElementById('cumulative-nps');

    var promoters = 0 / totalStudents * 100;
    var passives = 0 / totalStudents * 100;
    var detractors = 0 / totalStudents * 100;
    for (i = 0; i < dataRatings.length; i++) {
      promoters += (dataRatings[i]['nps']['promoters']) / dataRatings.length;
      passives += (dataRatings[i]['nps']['passive']) / dataRatings.length;
      detractors += (dataRatings[i]['nps']['detractors']) / dataRatings.length;

      npsProm.textContent = promoters.toFixed(1) + '% Promoters';
      npsPass.textContent = passives.toFixed(1) + '% Passives';
      npsDetr.textContent = detractors.toFixed(1) + '% Detractors';

      nps.textContent = (promoters - detractors).toFixed(1);
    }

    // A PONTUAÇÃO MÉDIA DAS MESTRES JEDI
    var jediRating = document.getElementById('jedi-rating');
    var jediMaster = 0;

    for (i = 0; i < dataRatings.length; i++) {
      jediMaster += (dataRatings[i]['jedi']) / dataRatings.length;
      jediRating.textContent = jediMaster.toFixed(1);
      if (jediMaster > 4.5) {
        jediRating.style.color = '#228B22';
      } else {
        jediRating.style.color = '#000000';
      }
    }

    // PORCENTUAL DE ALUNAS SATISFEITAS COM A EXPERIÊNCIA DA LABORATORIA 
    var studentSatisf = document.getElementById('student-satisf');
    var cumple = 0;
    var supera = 0;

    for (i = 0; i < dataRatings.length;i++) {
      cumple += (dataRatings[i]['student']['cumple']) / dataRatings.length;
      supera += (dataRatings[i]['student']['supera']) / dataRatings.length;

      studentSatisf.textContent = (cumple + supera).toFixed(1);
    }

    //PONTUAÇÃO TÉCNICA
    var studentTechSkills = 0;

    for (var i = 0; i < totalStudents; i++) {
      var scoreTech = 0;

      for (var j = 0; j < arrayStudents[i]['sprints'].length; j++) {
        scoreTech += arrayStudents[i]['sprints'][j]['score']['tech'];
      }

      var averageTech = scoreTech / arrayStudents[i]['sprints'].length;

      if (averageTech >= 1260) {
        studentTechSkills++;
      }
    }

    var studentsTech = document.getElementById('students-tech');
    studentsTech.textContent = studentTechSkills;

    var percentTech = document.getElementById('percent-tech');
    percentTech.textContent = ((studentTechSkills / totalStudents) * 100).toFixed(2);
    
    if (((studentTechSkills / totalStudents) * 100).toFixed(2) < 70) {
      percentTech.style.color = '#FF0000';
    } else if (((studentTechSkills / totalStudents) * 100).toFixed(2) <= 80) {
      percentTech.style.color = '#0404B4';
    } else if (((studentTechSkills / totalStudents) * 100).toFixed(2) > 80) {
      percentTech.style.color = '#228B22';
    }
    var changeInfoTech = document.getElementById('change-info-tech');
    changeInfoTech.textContent = '% TOTAL (' + totalStudents + ')';

    // NOTA TÉCNICA POR SPRINT
    var selectTech = document.getElementById('overall-tech');
    selectTech.addEventListener('change', techFilter);

    function techFilter() {
      var techSprintNumber = selectTech.value; 

      var studentsTechSprint = 0;
      for (var i = 0; i < totalStudents; i++) {
        if (arrayStudents[i].sprints[techSprintNumber].score.tech >= 1260) {
          studentsTechSprint++;
        }
      }

      studentsTech.textContent = studentsTechSprint;
      percentTech.textContent = ((studentsTechSprint / totalStudents) * 100).toFixed(2);

      if (((studentsTechSprint / totalStudents) * 100).toFixed(2) < 70) {
        percentTech.style.color = '#FF0000';
      } else if (((studentsTechSprint / totalStudents) * 100).toFixed(2) <= 80) {
        percentTech.style.color = '#0404B4';
      } else if (((studentsTechSprint / totalStudents) * 100).toFixed(2) > 80) {
        percentTech.style.color = '#228B22';
      }
      changeInfoTech.textContent = '% TOTAL (' + totalStudents + ')';
    }
    selectTech.value = '';

    // HSE
    var studentLifeSkills = 0;

    for (var i = 0; i < totalStudents; i++) {
      var scoreLife = 0;

      for (var j = 0; j < arrayStudents[i]['sprints'].length; j++) {
        scoreLife += arrayStudents[i]['sprints'][j]['score']['hse'];
      }

      var averageLife = scoreLife / arrayStudents[i]['sprints'].length;

      if (averageLife >= 840) {
        studentLifeSkills++;
      }
    }

    var studentsLife = document.getElementById('students-life');
    studentsLife.textContent = studentLifeSkills;

    var percentLife = document.getElementById('percent-life');
    percentLife.textContent = ((studentLifeSkills / totalStudents) * 100).toFixed(2);

    if (((studentLifeSkills / totalStudents) * 100).toFixed(2) < 70) {
      percentLife.style.color = '#FF0000';
    } else if (((studentLifeSkills / totalStudents) * 100).toFixed(2) <= 80) {
      percentLife.style.color = '#0404B4';
    } else if (((studentLifeSkills / totalStudents) * 100).toFixed(2) > 80) {
      percentLife.style.color = '#228B22';
    }

    var changeInfoLife = document.getElementById('change-info-life');
    changeInfoLife.textContent = '% TOTAL (' + totalStudents + ')';

    // HSE POR SPRINT
    var selectLife = document.getElementById('overall-life');
    selectLife.addEventListener('change', lifeFilter);

    function lifeFilter() {
      var lifeSprintNumber = selectLife.value;

      var studentsLifeSprint = 0;
      for (var i = 0; i < totalStudents; i++) {
        if (arrayStudents[i].sprints[lifeSprintNumber].score.hse >= 840) {
          studentsLifeSprint++;
        }
      }

      studentsLife.textContent = studentsLifeSprint;
      percentLife.textContent = ((studentsLifeSprint / totalStudents) * 100).toFixed(2);

      if (((studentsLifeSprint / totalStudents) * 100).toFixed(2) < 70) {
        percentLife.style.color = '#FF0000';
      } else if (((studentsLifeSprint / totalStudents) * 100).toFixed(2) <= 80) {
        percentLife.style.color = '#0404B4';
      } else if (((studentsLifeSprint / totalStudents) * 100).toFixed(2) > 80) {
        percentLife.style.color = '#228B22';
      }
      changeInfoLife.textContent = '% TOTAL (' + totalStudents + ')';
    }
    selectLife.value = '';

    // GOOGLE CHARTS
    // GRAFICOS DO JEDI
    function drawChart() {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'conquest');
      data.addColumn('number', 'points');
      data.addRows([
        ['pontos não obtidos', 5 - jediMaster],
        ['media de pontos obtidos', jediMaster],
      ]);

      var options = {'title': 'Avaliação dos jedis',
        'width': 500,
        'height': 300,
        'is3D': true,
        'colors': ['#FF009E']};

      var chart = new google.visualization.ColumnChart(document.getElementById('jedi-chart'));
      chart.draw(data, options);

      // GRÁFICOS DOS MENTORES
      var dataTwo = new google.visualization.DataTable();
      dataTwo.addColumn('string', 'conquest');
      dataTwo.addColumn('number', 'points');
      dataTwo.addRows([
        ['pontos não obtidos', 5 - overallTeacherRating],
        ['media de pontos obtidos', overallTeacherRating],
      ]);

      var optionsTwo = {'title': 'Avaliação dos mentores',
        'width': 500,
        'height': 300,
        'is3D':true,
        'colors': ['#FF009E']};

      var chartTwo = new google.visualization.ColumnChart(document.getElementById('teacher-chart'));
      chartTwo.draw(dataTwo, optionsTwo);

      // GRÁFICO DA SATISFAÇÃO DOS ESTUDANTES
      var dataThree = new google.visualization.DataTable();
      dataThree.addColumn('string', 'conquest');
      dataThree.addColumn('number', 'points');
      dataThree.addRows([
        ['Não atende as expectativa', 100 - (cumple + supera)],
        ['Supera as expectativa', cumple + supera],
      ]);

      var optionsThree = {'title': 'Expectativas das alunas em relação ao Laboratória',
        'width': 500,
        'height': 300,
        'is3D': true,
        'colors': ['#FF009E']};

      var chartThree = new google.visualization.ColumnChart(document.getElementById('satisfaction-chart'));
      chartThree.draw(dataThree, optionsThree);

      // GRÁFICOS NPS
      var dataFuor = new google.visualization.DataTable();
      dataFuor.addColumn('string', 'conquest');
      dataFuor.addColumn('number', 'points');
      dataFuor.addRows([
        ['Detractors', detractors / 100 * totalStudents],
        ['Passives', passives / 100 * totalStudents],
        ['Promoters', promoters / 100 * totalStudents]
      ]);

      var optionsFuor = {'title': 'Recomendaria a Laboratória a outras pessoas',
        'width': 500,
        'height': 300,
        'is3D': true,
        'colors': [ '#FF009E', '#1E90FF', '#56F89A']};

      var chartFuor = new google.visualization.PieChart(document.getElementById('nps-chart'));
      chartFuor.draw(dataFuor, optionsFuor);

      // GRÁFICOS DE INSCRITOS
      var dataFive = new google.visualization.DataTable();
      dataFive.addColumn('string', 'name');
      dataFive.addColumn('number', 'students');
      dataFive.addRows([
        ['Desistentes', dropout],
        ['Frequentes', totalStudents - dropout],
      ]);

      var optionsFive = {'title': 'Frequentes e desistentes',
        'width': 500,
        'height': 300,
        'is3D': true,
        'colors': [  '#FF009E', '#56F89A']};

      var chartFive = new google.visualization.PieChart(document.getElementById('enrollment-chart'));
      chartFive.draw(dataFive, optionsFive);

      // A QUANTIDADE E PORCENTAGEM QUE REPRESENTA O TOTAL DE ALUNAS QUE EXCEDEM A META DE PONTOS TÉCNICOS EM MÉDIA E SPRINT.
      var dataSix = new google.visualization.DataTable();
      dataSix.addColumn('string', 'name');
      dataSix.addColumn('number', 'students');
      dataSix.addRows([
        ['Não superou a meta', totalStudents - studentMeetTarget],
        ['Superou a meta', studentMeetTarget],
      ]);

      var optionsSix = {'title': 'Estudantes que superaram a meta por sprint',
        'width': 500,
        'height': 300,
        'is3D': true,
        'colors': [  '#FF009E', '#56F89A']};

      var chartSix = new google.visualization.PieChart(document.getElementById('achiv-chart'));
      chartSix.draw(dataSix, optionsSix);
    }
    // Set a callback to run when the Google Visualization API is loaded
    google.charts.setOnLoadCallback(drawChart);
    
    // FUNÇÃO PARA APARECER LISTA DE ESTUDANTES
    var containerOfStudents = document.getElementById('listOfStudents');
    function studentsByGenerations() {
      containerOfStudents.innerHTML = '';
      for (var i = 0; i < arrayStudents.length; i++) {
        arrayStudents[i];

        var profileStudent = document.createElement('div');
        profileStudent.classList.add('profile-student');
        containerOfStudents.appendChild(profileStudent);

        var imgProfile = document.createElement('img');
        imgProfile.setAttribute('src', arrayStudents[i].photo);
        imgProfile.classList.add('img-student');
        profileStudent.appendChild(imgProfile);

        var studentName = document.createElement('p');
        studentName.textContent = arrayStudents[i].name.toUpperCase();
        studentName.classList.add('name-student');
        profileStudent.appendChild(studentName);

        var boxTech = document.createElement('div');
        var percentTech = document.createElement('p');
        var techSkill = document.createElement('p');
        techSkill.textContent = 'Habilidades técnicas';
        boxTech.classList.add('box-tech');
        boxTech.appendChild(percentTech);
        boxTech.appendChild(techSkill);
        profileStudent.appendChild(boxTech);

        var boxLife = document.createElement('div');
        var percentLife = document.createElement('p');
        var lifeSkill = document.createElement('p');
        lifeSkill.textContent = 'Habilidades socioemocionais';
        boxLife.classList.add('box-life');
        boxLife.appendChild(percentLife);
        boxLife.appendChild(lifeSkill);
        profileStudent.appendChild(boxLife);

        if (arrayStudents[i]['sprints'].length > 0) {
          var totalTech = 0;
          var totalHse = 0;
          for (var j = 0; j < arrayStudents[i]['sprints'].length; j++) {
            totalTech += arrayStudents[i]['sprints'][j]['score']['tech'];
            totalHse += arrayStudents[i]['sprints'][j]['score']['hse'];
          }
          percentTech.textContent = (totalTech / arrayStudents[i]['sprints'].length).toFixed(1);
          percentLife.textContent = (totalHse / arrayStudents[i]['sprints'].length).toFixed(1);
        } else {
          percentTech.textContent = 'Não há dados suficientes';
          percentLife.textContent = 'Não há dados suficientes';
          lifeSkill.textContent = '';
          techSkill.textContent = '';

        }
      }
    }
    studentsByGenerations();
  }

  var addAndHide = function(event) {
    var tabSeleccionado = event.target.dataset.tabSelect;
    var overview = document.getElementById('section-overview');
    var students = document.getElementById('section-students');
    var teachers = document.getElementById('section-teachers');

    if (tabSeleccionado === 'tabOverview') {
      students.style.display = 'none';
      teachers.style.display = 'none';
      overview.style.display = 'block';
    } else if (tabSeleccionado === 'tabStudents') {
      students.style.display = 'block';
      teachers.style.display = 'none';
      overview.style.display = 'none';
    } else if (tabSeleccionado === 'tabTeachers') {
      students.style.display = 'none';
      teachers.style.display = 'block';
      overview.style.display = 'none';
    }
  };

  var changeSection = function() {
    var lis = document.getElementsByClassName('tab');
    for (var i = 0; i < lis.length; i++) {
      lis[i].addEventListener('click', addAndHide);
    }
  };
  changeSection();
});
